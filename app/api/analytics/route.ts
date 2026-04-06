import { BetaAnalyticsDataClient } from "@google-analytics/data";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

const PROPERTY_ID = "497614207";

const ALLOWED_RANGES = new Set([7, 30, 90]);

interface AnalyticsRow {
  date: string;
  activeUsers: number;
  newUsers: number;
  sessions: number;
  engagementRate: number;
  pageViews: number;
}

function parseRange(searchParams: URLSearchParams): number {
  const rawRange = Number(searchParams.get("range") ?? 7);
  return ALLOWED_RANGES.has(rawRange) ? rawRange : 7;
}

function calculateTrend(values: number[]): number {
  if (values.length < 2) return 0;

  const midpoint = Math.floor(values.length / 2);
  const previousValues = values.slice(0, midpoint);
  const currentValues = values.slice(midpoint);

  if (previousValues.length === 0 || currentValues.length === 0) return 0;

  const previousAvg =
    previousValues.reduce((sum, value) => sum + value, 0) / previousValues.length;
  const currentAvg =
    currentValues.reduce((sum, value) => sum + value, 0) / currentValues.length;

  if (previousAvg === 0) return currentAvg > 0 ? 100 : 0;

  return Number((((currentAvg - previousAvg) / previousAvg) * 100).toFixed(1));
}

function createAnalyticsClient(): BetaAnalyticsDataClient {
  const serviceAccountPath = path.join(process.cwd(), "lib", "ga-key.json");

  if (process.env.GA_CLIENT_EMAIL && process.env.GA_PRIVATE_KEY) {
    return new BetaAnalyticsDataClient({
      credentials: {
        client_email: process.env.GA_CLIENT_EMAIL,
        private_key: process.env.GA_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
    });
  }

  if (fs.existsSync(serviceAccountPath)) {
    return new BetaAnalyticsDataClient({
      keyFilename: serviceAccountPath,
    });
  }

  throw new Error(
    "Google Analytics credentials not found. Add lib/ga-key.json or set GA_CLIENT_EMAIL and GA_PRIVATE_KEY."
  );
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const range = parseRange(url.searchParams);
    
    let client;
    try {
      client = createAnalyticsClient();
    } catch (error) {
      return Response.json(
        { 
          error: "Analytics not configured. Please set GA_CLIENT_EMAIL and GA_PRIVATE_KEY environment variables.",
          series: [],
          summary: {
            totalActiveUsers: 0,
            totalNewUsers: 0,
            totalSessions: 0,
            totalPageViews: 0,
            averageEngagementRate: 0,
            peakActiveUsers: 0,
            activeUserTrend: 0
          }
        },
        { status: 200 }
      );
    }

    const [response] = await client.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: `${range}daysAgo`, endDate: "today" }],
      metrics: [
        { name: "activeUsers" },
        { name: "newUsers" },
        { name: "sessions" },
        { name: "engagementRate" },
        { name: "screenPageViews" },
      ],
      dimensions: [{ name: "date" }],
      orderBys: [{ dimension: { dimensionName: "date" }, desc: false }],
    });

    const series: AnalyticsRow[] =
      response.rows?.map((row) => ({
        date: row.dimensionValues?.[0]?.value ?? "",
        activeUsers: Number(row.metricValues?.[0]?.value ?? 0),
        newUsers: Number(row.metricValues?.[1]?.value ?? 0),
        sessions: Number(row.metricValues?.[2]?.value ?? 0),
        engagementRate: Number(row.metricValues?.[3]?.value ?? 0),
        pageViews: Number(row.metricValues?.[4]?.value ?? 0),
      })) ?? [];

    const totalActiveUsers = series.reduce((sum, item) => sum + item.activeUsers, 0);
    const totalNewUsers = series.reduce((sum, item) => sum + item.newUsers, 0);
    const totalSessions = series.reduce((sum, item) => sum + item.sessions, 0);
    const totalPageViews = series.reduce((sum, item) => sum + item.pageViews, 0);
    const averageEngagementRate =
      series.length > 0
        ? Number(
            (
              series.reduce((sum, item) => sum + item.engagementRate, 0) / series.length
            ).toFixed(3)
          )
        : 0;
    const peakActiveUsers = Math.max(0, ...series.map((item) => item.activeUsers));
    const activeUserTrend = calculateTrend(series.map((item) => item.activeUsers));

    return Response.json({
      range,
      summary: {
        totalActiveUsers,
        totalNewUsers,
        totalSessions,
        totalPageViews,
        averageEngagementRate,
        peakActiveUsers,
        activeUserTrend,
      },
      series,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
