import React from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';

const About: React.FC = () => {

  const generatePDF = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });

    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 14;
    const contentW = pageW - margin * 2;
    const ACCENT = "#1F4E79";
    const GRAY = "#555555";

    let y = 14;

    const addPage = () => {
      doc.addPage();
      y = 14;
    };

    const checkY = (needed: number) => {
      if (y + needed > pageH - 10) addPage();
    };

    const sectionHeader = (title: string) => {
      checkY(10);
      y += 4;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(ACCENT);
      doc.text(title, margin, y);
      y += 2;
      doc.setDrawColor(ACCENT);
      doc.setLineWidth(0.4);
      doc.line(margin, y, pageW - margin, y);
      y += 5;
      doc.setTextColor("#000000");
    };

    const bulletLine = (text: string, indent = margin + 3) => {
      const lines = doc.splitTextToSize(`\u2022  ${text}`, contentW - (indent - margin) - 2);
      checkY(lines.length * 4.2);
      doc.text(lines, indent, y);
      y += lines.length * 4.2;
    };

    const twoCol = (left: string, right: string) => {
      doc.text(left, margin, y);
      doc.text(right, pageW - margin, y, { align: "right" });
    };

    // NAME
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(ACCENT);
    doc.text("SHRUTI KUSHWAHA", pageW / 2, y, { align: "center" });
    y += 6;

    // CONTACT
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(GRAY);
    doc.text("Kanpur, Uttar Pradesh  \u2022  6393108661  \u2022  shrutikushwaha740@gmail.com", pageW / 2, y, { align: "center" });
    y += 4;
    doc.text("linkedin.com/in/shrutikush06  \u2022  github.com/shrutikushwaha18", pageW / 2, y, { align: "center" });
    y += 2;
    doc.setTextColor("#000000");

    // PROFESSIONAL SUMMARY
    sectionHeader("PROFESSIONAL SUMMARY");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    const summary =
      "Computer Science (AI) student with hands-on experience in Machine Learning, NLP, and Full-Stack Web Development. Proficient in Python, TensorFlow, and modern JS frameworks. Built real-time AI systems, NLP pipelines, and responsive web apps. Seeking an entry-level Software / ML Engineer role to deliver impactful, data-driven solutions.";
    const sumLines = doc.splitTextToSize(summary, contentW);
    doc.text(sumLines, margin, y);
    y += sumLines.length * 4.2 + 2;

    // TECHNICAL SKILLS
    sectionHeader("TECHNICAL SKILLS");
    doc.setFontSize(8.5);

    const skills = [
      { label: "Languages",     value: "Python, C++, Java, JavaScript" },
      { label: "ML / AI",       value: "TensorFlow, PyTorch, Scikit-learn, NumPy, Pandas, Matplotlib, OpenCV" },
      { label: "Generative AI", value: "LangChain, OpenAI API, RAG (Retrieval-Augmented Generation)" },
      { label: "Web Dev",       value: "React.js, Node.js, Express.js, Socket.io, HTML5, CSS3, REST APIs" },
      { label: "Databases",     value: "MySQL, MongoDB, AWS (basics)" },
      { label: "Tools",         value: "Git, GitHub, VS Code, Postman, Flask" },
      { label: "Core CS",       value: "Data Structures & Algorithms, OOP, DBMS" },
    ];

    skills.forEach(({ label, value }) => {
      checkY(5);
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, margin, y);
      doc.setFont("helvetica", "normal");
      const labelW = doc.getTextWidth(`${label}:  `);
      const valLines = doc.splitTextToSize(value, contentW - labelW);
      doc.text(valLines[0], margin + labelW, y);
      if (valLines.length > 1) {
        y += 4;
        doc.text(valLines.slice(1).join(" "), margin + labelW, y);
      }
      y += 4.5;
    });

    // PROJECTS
    sectionHeader("PROJECTS");

    const projects = [
      {
        name: "SynapseChat – AI-Powered Smart Interaction Engine",
        date: "Jan 2026 – Present",
        tech: "Node.js · Express.js · Socket.io · OpenAI API · LangChain",
        bullets: [
          "Engineered a real-time chat platform using Socket.io, enabling low-latency bi-directional communication.",
          "Integrated LangChain for structured prompt management, context chaining, and multi-turn conversation handling.",
          "Designed a fully responsive chat UI focused on user experience and scalability.",
        ],
      },
      {
        name: "Sentiment Analysis System",
        date: "Aug 2025 – Dec 2025",
        tech: "Python · NumPy · Pandas · Scikit-learn · TensorFlow · PyTorch",
        bullets: [
          "Developed a multi-class text classification model achieving 75% accuracy on real-world review datasets.",
          "Applied NLP preprocessing: TF-IDF vectorization, tokenization, and stop-word removal.",
          "Built optimized data pipelines capable of handling large-scale text corpora efficiently.",
        ],
      },
      {
        name: "Expense Tracker Application",
        date: "Aug 2024 – Dec 2024",
        tech: "React.js · JavaScript · HTML5 · CSS3 · REST APIs",
        bullets: [
          "Built a full-featured finance tracker with real-time income, expense, and balance management.",
          "Leveraged React component architecture for a dynamic, responsive, and accessible UI.",
          "Deployed on live hosting, making it publicly accessible and production-ready.",
        ],
      },
    ];

    projects.forEach((project) => {
      checkY(20);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      twoCol(project.name, project.date);
      y += 4;

      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(GRAY);
      doc.text(project.tech, margin + 2, y);
      y += 4;
      doc.setTextColor("#000000");

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      project.bullets.forEach((b) => bulletLine(b, margin + 2));
      y += 2;
    });

    // EDUCATION
    sectionHeader("EDUCATION");

    const education = [
      {
        institute: "Pranveer Singh Institute of Technology",
        duration: "2023 – 2027 (Pursuing)",
        degree: "B.Tech in Computer Science (Artificial Intelligence)",
        location: "Kanpur",
        detail: "Percentage: 70.96% (Till 5th Semester)",
      },
      {
        institute: "Mount Carmel Intermediate College",
        duration: "2023",
        degree: "Intermediate – Science (UP Board)",
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
      checkY(14);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      twoCol(edu.institute, edu.duration);
      y += 4;

      doc.setFont("helvetica", "italic");
      doc.setTextColor(GRAY);
      twoCol(edu.degree, edu.location);
      y += 4;

      doc.setFont("helvetica", "normal");
      doc.setTextColor("#000000");
      doc.text(edu.detail, margin + 2, y);
      y += 6;
    });

    // CERTIFICATIONS
    sectionHeader("CERTIFICATIONS & ACHIEVEMENTS");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);

    const certs = [
      "Machine Learning – Coursera (Apr 2026)",
      "Agentblazer Champion – Salesforce Trailhead (Mar 2026)",
      "Fundamentals of Python – Infosys Springboard (Sep 2024)",
      "LeetCode – Active problem solver with consistent focus on optimized DSA solutions",
    ];

    certs.forEach((c) => bulletLine(c));

    doc.save("Resume.pdf");
  };  // <-- generatePDF ends here

  return (
    <section id="about" className="py-24 px-6 md:px-24">
      <div className="container mx-auto">

        <div className="section-title-layered">
          <span className="bg">About</span>
          <h2 className="main">About</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* IMAGE */}
          <motion.div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute -top-6 -left-6 w-32 h-32 border-l-2 border-t-2 border-cyan-400"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r-2 border-b-2 border-cyan-400"></div>
              <div className="overflow-hidden rounded-3xl">
                <img
                  src="/portfolio.image.jpeg"
                  alt="Shruti Kushwaha"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* TEXT */}
          <motion.div className="flex flex-col gap-6">
            <h3 className="text-3xl font-bold">
              Hi, I'm <span className="text-neon-teal">Shruti Kushwaha</span>
            </h3>

            <p>
              I specialize in full stack web development and AI based applications.
              I thrive on transforming ideas into functional and visually appealing websites.
            </p>

            <p>
              Throughout my studies, I have gained hands-on experience in various programming languages,
              including Python, Java, and C++. I have worked on several projects, which have honed my
              technical skills and strengthened my ability to collaborate within diverse teams.
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
};  // <-- component ends here

export { About };