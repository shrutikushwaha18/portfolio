import React from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';

export const About: React.FC = () => {

  const generatePDF = () => {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  let y = 15;

  // NAME
  doc.setFont("times", "bold");
  doc.setFontSize(24);
  doc.text("SHRUTI KUSHWAHA", pageWidth / 2, y, { align: "center" });
  y += 8;

  // CONTACT
  doc.setFont("times", "normal");
  doc.setFontSize(9);

  doc.text(
    "6393108661 | shrutikushwaha740@gmail.com",
    pageWidth / 2,
    y,
    { align: "center" }
  );
  y += 4;

  doc.text(
    "https://linkedin.com/in/shrutikush06 | https://github.com/shrutikushwaha18",
    pageWidth / 2,
    y,
    { align: "center" }
  );
  y += 4;

  doc.text(
    "Kanpur, Uttar Pradesh, India",
    pageWidth / 2,
    y,
    { align: "center" }
  );
  y += 8;

  const addSectionHeader = (title: string) => {
    doc.setFont("times", "bold");
    doc.setFontSize(11);
    doc.text(title, margin, y);

    y += 1.5;
    doc.setLineWidth(0.1);
    doc.line(margin, y, pageWidth - margin, y);

    y += 5;
  };

  // OBJECTIVE
  addSectionHeader("CAREER OBJECTIVE");

  doc.setFont("times", "normal");
  doc.setFontSize(9);

  const objective =
    "Computer Science (AI) student with a strong foundation in Machine Learning, Computer Vision, and Full-Stack Development. Seeking an entry-level role to apply skills in Python, AI/ML, and Web Technologies while contributing to organizational growth.";

  const objLines = doc.splitTextToSize(objective, contentWidth);
  doc.text(objLines, margin, y);
  y += objLines.length * 4 + 5;

  // EDUCATION
  addSectionHeader("EDUCATION");

  const education = [
    {
      institute: "Pranveer Singh Institute of Technology",
      duration: "2023 - Pursuing",
      degree: "B.Tech in Computer Science (AI)",
      location: "Kanpur",
      detail: "Percentage: 70.96% (Till 5th Semester)",
    },
    {
      institute: "Mount Carmel Intermediate College",
      duration: "2023",
      degree: "Intermediate (UP Board)",
      location: "Kanpur",
      detail: "Percentage: 65%",
    },
    {
      institute: "Mount Carmel Intermediate College",
      duration: "2021",
      degree: "High School (UP Board)",
      location: "Kanpur",
      detail: "Percentage: 84%",
    },
  ];

  education.forEach((edu) => {
    doc.setFont("times", "bold");
    doc.text(`• ${edu.institute}`, margin, y);
    doc.text(edu.duration, pageWidth - margin, y, {
      align: "right",
    });

    y += 4;

    doc.setFont("times", "italic");
    doc.text(edu.degree, margin + 3, y);

    doc.setFont("times", "normal");
    doc.text(edu.location, pageWidth - margin, y, {
      align: "right",
    });

    y += 4;

    doc.text(edu.detail, margin + 3, y);

    y += 6;
  });

  // SKILLS
  addSectionHeader("SKILLS");

  const skills = [
    { label: "Programming", value: "C++, Java, Python" },
    {
      label: "ML & AI",
      value:
        "Scikit-learn, TensorFlow, PyTorch, NumPy, Pandas, Matplotlib, OpenCV",
    },
    {
      label: "Gen AI",
      value: "LangChain, OpenAI API, RAG",
    },
    {
      label: "Web Development",
      value: "HTML, CSS3, JavaScript, React, Express.js (Basic)",
    },
    {
      label: "Database",
      value: "MySQL, MongoDB",
    },
    {
      label: "Core CS",
      value: "DSA, OOP, DBMS",
    },
    {
      label: "Tools",
      value: "Git, GitHub, VS Code, Postman, Flask, AWS",
    },
    {
      label: "Soft Skills",
      value: "Problem Solving, Analytical Thinking, Team Collaboration",
    },
  ];

  skills.forEach((skill) => {
    doc.setFont("times", "bold");
    doc.text(`${skill.label}:`, margin, y);

    doc.setFont("times", "normal");
    doc.text(skill.value, margin + 40, y);

    y += 5;
  });

  y += 2;

  // PROJECTS
  addSectionHeader("PROJECTS");

  const projects = [
    {
      name: "SynapseChat – AI-Powered Smart Interaction Engine",
      date: "Jan 2026 - Ongoing",
      tech: "Node.js, Express.js, Socket.io, OpenAI API, LangChain",
      bullets: [
        "Built real-time chat functionality using Socket.io for instant communication.",
        "Utilized LangChain for prompt management and workflow chaining.",
        "Designed a responsive and user-friendly chat interface.",
      ],
    },
    {
      name: "Sentiment Analysis System",
      date: "Aug 2025 - Dec 2025",
      tech:
        "Python, NumPy, Pandas, Scikit-learn, TensorFlow, PyTorch",
      bullets: [
        "Built a text classification model achieving 75% accuracy.",
        "Applied NLP techniques including TF-IDF and tokenization.",
        "Optimized large-scale data processing pipelines.",
      ],
    },
    {
      name: "Expense Tracker Application",
      date: "Aug 2024 - Dec 2024",
      tech: "HTML, CSS, JavaScript, ReactJS, REST APIs",
      bullets: [
        "Implemented real-time balance, income and expense tracking.",
        "Enhanced UI responsiveness using React component architecture.",
        "Successfully deployed and accessible through live hosting.",
      ],
    },
  ];

  projects.forEach((project) => {
    doc.setFont("times", "bold");
    doc.text(`• ${project.name}`, margin, y);

    doc.text(project.date, pageWidth - margin, y, {
      align: "right",
    });

    y += 4;

    doc.setFont("times", "italic");
    doc.setFontSize(8);
    doc.text(project.tech, margin + 3, y);

    y += 4;

    doc.setFont("times", "normal");
    doc.setFontSize(9);

    project.bullets.forEach((bullet) => {
      const lines = doc.splitTextToSize(
        `• ${bullet}`,
        contentWidth - 6
      );

      doc.text(lines, margin + 3, y);

      y += lines.length * 4;
    });

    y += 2;
  });

  // CERTIFICATES
  addSectionHeader("CERTIFICATES & ACHIEVEMENTS");

  const certificates = [
    "Fundamentals of Python - Infosys Springboard (Sep 2024)",
    "Machine Learning - Coursera (Apr 2026)",
    "Agentblazer Champion - Salesforce Trailhead (Mar 2026)",
    "LeetCode - Active problem solver focused on optimized DSA solutions",
  ];

  doc.setFont("times", "normal");
  doc.setFontSize(9);

  certificates.forEach((item) => {
    const lines = doc.splitTextToSize(
      `• ${item}`,
      contentWidth
    );

    doc.text(lines, margin, y);

    y += lines.length * 4 + 1;
  });

  doc.save("Shruti_Kushwaha_Resume.pdf");
};
  return (
    <section id="about" className="py-24 px-6 md:px-24">
      <div className="container mx-auto">

        <div className="section-title-layered">
          <span className="bg">About</span>
          <h2 className="main">About</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* IMAGE */}
          <motion.div
            className="relative"
          >
<div className="w-full max-w-md mx-auto overflow-hidden rounded-2xl border-t-2 border-b-2 border-neon-teal">
         
       <img 
                src="/portfolio.image.jpeg"
                alt="Shruti Kushwaha"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* TEXT */}
          <motion.div className="flex flex-col gap-6">
            <h3 className="text-3xl font-bold">
              Hi, I’m <span className="text-neon-teal">Shruti Kushwaha</span>
            </h3>

            <p>
           I specialize in full stack web development and AI based applications.
            I thrive on transforming ideas into functional and visually appealing websites.
           </p>

            <p>
              Throughout my studies, I have gained hands-on experience in various programming languages, including Python, Java, and C++. I have worked on several projects, which have honed my technical skills and strengthened my ability to collaborate within diverse teams.
            </p>

            <p>
              Feel free to connect with me to discuss technology, projects, or collaboration opportunities!
            </p>

            <button onClick={generatePDF} className="neon-button">
              Download Resume
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};