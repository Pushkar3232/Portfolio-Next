import { db } from '../lib/firebase.js';
import { collection, addDoc } from 'firebase/firestore';

async function migrateData() {
  try {
    // Education
    const education = {
      degree: 'Diploma in Computer Engineering',
      status: 'Recently Graduated',
      institution: 'Technical Institute',
      year: '2025',
      description: 'Comprehensive program covering software development and engineering principles.'
    };

    await addDoc(collection(db, 'education'), education);
    console.log('✅ Education added');

    // Certificates
    const certificates = [
      {
        title: "Maths and Statistics for AI",
        provider: "CodeBasics",
        date: "26/1/2025",
        image: "/images/Skill/Maths for AI.jpg",
        credentialUrl: "https://codebasics.io/certificate/CB-63-491529",
        category: "AI/ML"
      },
      {
        title: "Introduction to Large Language Models",
        provider: "LinkedIn Learning",
        date: "22/2/2025",
        image: "/images/Skill/Introduction to Large Language Models.jpg",
        credentialUrl: "https://www.linkedin.com/learning/certificates/9bbc571a842663a0cd3f70a5b552ffd72294b0922eecdd7c6da0484cf3226d32",
        category: "AI/ML"
      },
      {
        title: "Generative AI vs. Traditional AI",
        provider: "LinkedIn Learning",
        date: "23/2/2025",
        image: "/images/Skill/Generative AI vs. Traditional AI.jpg",
        credentialUrl: "https://www.linkedin.com/learning/certificates/e277172a1fdee20b33dd7dd2a4370bbaddbb5c9fc7409d0805c67e31da0fce52",
        category: "AI/ML"
      },
      {
        title: "Generative AI: Working with Large Language Models",
        provider: "LinkedIn Learning",
        date: "25/2/2025",
        image: "/images/Skill/Generative AI Working with Large Language.jpg",
        credentialUrl: "https://www.linkedin.com/learning/certificates/977524b5d18a86fd0a17653cc7c37c73c49d70d068242a4dd93ed1311523526a",
        category: "AI/ML"
      },
      {
        title: "Leading Your Team Through Change",
        provider: "LinkedIn Learning",
        date: "25/2/2025",
        image: "/images/Skill/Leading Your Team Through Change.jpg",
        credentialUrl: "https://www.linkedin.com/learning/certificates/d0ce5e8cf5b24c9e2e29c5e7be3f848e5c9ed2052d76e489b95a19eeaf236fc4",
        category: "Leadership"
      }
    ];

    for (const cert of certificates) {
      await addDoc(collection(db, 'certificates'), cert);
    }

    console.log('✅ All certificates added');
    process.exit(0);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateData();
