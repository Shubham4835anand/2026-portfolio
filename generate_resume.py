import os
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

def generate_resume(output_path):
    # Dimensions: 595.27 x 841.89 points (A4)
    width, height = A4
    c = canvas.Canvas(output_path, pagesize=A4)

    left = 54.0
    right = 541.0
    content_width = right - left
    y = height - 36.0

    # 1. Header
    c.setFont("Helvetica-Bold", 24)
    c.setFillColorRGB(0.08, 0.08, 0.08)
    c.drawString(left, y, "Shubham Anand")
    y -= 17.0

    c.setFont("Helvetica", 9.0)
    c.setFillColorRGB(0.2, 0.2, 0.2)
    
    phone = "+91 8507413806"
    dot = " • "
    email = "shubham4835@gmail.com"
    gh_text = "GitHub"
    li_text = "LinkedIn"

    x_cur = left
    c.drawString(x_cur, y, phone + dot)
    x_cur += c.stringWidth(phone + dot, "Helvetica", 9.0)

    # Email with link
    c.drawString(x_cur, y, email)
    c.linkURL("mailto:shubham4835@gmail.com", (x_cur, y - 2, x_cur + c.stringWidth(email, "Helvetica", 9.0), y + 10))
    x_cur += c.stringWidth(email, "Helvetica", 9.0)

    c.drawString(x_cur, y, dot)
    x_cur += c.stringWidth(dot, "Helvetica", 9.0)

    # GitHub with link
    c.drawString(x_cur, y, gh_text)
    c.linkURL("https://github.com/Shubham4835anand", (x_cur, y - 2, x_cur + c.stringWidth(gh_text, "Helvetica", 9.0), y + 10))
    x_cur += c.stringWidth(gh_text, "Helvetica", 9.0)

    c.drawString(x_cur, y, dot)
    x_cur += c.stringWidth(dot, "Helvetica", 9.0)

    # LinkedIn with link
    c.drawString(x_cur, y, li_text)
    c.linkURL("https://www.linkedin.com/in/shubham-anand-9a6b19218/", (x_cur, y - 2, x_cur + c.stringWidth(li_text, "Helvetica", 9.0), y + 10))    # Helper for drawing section headers with distinct gap above title
    def draw_section_header(title, curr_y, gap_above=20.0):
        curr_y -= gap_above
        c.setFont("Helvetica-Bold", 9.8)
        c.setFillColorRGB(0.08, 0.08, 0.08)
        c.drawString(left, curr_y, title)
        curr_y -= 4.0
        c.setStrokeColorRGB(0.2, 0.2, 0.2)
        c.setLineWidth(0.65)
        c.line(left, curr_y, right, curr_y)
        return curr_y - 9.5

    # 2. Professional Summary
    y = draw_section_header("PROFESSIONAL SUMMARY", y, gap_above=18.0)
    c.setFont("Helvetica", 8.4)
    c.setFillColorRGB(0.18, 0.18, 0.18)
    summary_text = (
        "Oracle APEX Developer with 1+ years of experience building enterprise web applications, PL/SQL backend systems, "
        "and AI-integrated cloud portals with RAG, Azure OpenAI, and modern web interfaces. Skilled in developing responsive "
        "user interfaces, RESTful APIs, and database-driven solutions with Oracle 19c/21c/26ai and MongoDB."
    )
    words = summary_text.split(" ")
    line = ""
    for w in words:
        test = line + (" " if line else "") + w
        if c.stringWidth(test, "Helvetica", 8.4) < content_width:
            line = test
        else:
            c.drawString(left, y, line)
            y -= 11.2
            line = w
    if line:
        c.drawString(left, y, line)
        y -= 11.2

    # 3. Key Skills
    y = draw_section_header("KEY SKILLS", y, gap_above=19.0)
    skills = [
        ("Database & Enterprise", "Oracle APEX, PL/SQL, Oracle 19c/21c/26ai, SQL, Schema Design, Stored Procedures"),
        ("Frontend & Full Stack", "React.js, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Bootstrap"),
        ("AI & Vector Search", "RAG Pipelines, Azure OpenAI, Embeddings, Vector Search, LangChain"),
        ("Backend & Tools", "Node.js, Express.js, RESTful APIs, Git, GitHub, VS Code, Postman")
    ]
    for category, items in skills:
        c.setFont("Helvetica", 8.4)
        c.drawString(left + 6, y, "•")
        c.setFont("Helvetica-Bold", 8.4)
        c.drawString(left + 16, y, f"{category}: ")
        cat_w = c.stringWidth(f"{category}: ", "Helvetica-Bold", 8.4)
        c.setFont("Helvetica", 8.4)
        c.drawString(left + 16 + cat_w, y, items)
        y -= 11.5

    # 4. Professional Experience
    y = draw_section_header("PROFESSIONAL EXPERIENCE", y, gap_above=19.0)
    
    # Path Infotech
    c.setFont("Helvetica-Bold", 9.0)
    c.drawString(left, y, "Path Infotech Ltd.")
    c.drawRightString(right, y, "August 2025 - Present")
    y -= 11.0

    c.setFont("Helvetica-Bold", 8.4)
    c.drawString(left, y, "Oracle APEX Developer")
    y -= 10.2

    path_bullets = [
        "Spearheading development of enterprise web applications and AI-integrated cloud portals using Oracle APEX, PL/SQL, and REST APIs.",
        "Architected enterprise RAG retrieval pipelines with Azure OpenAI and vector search, enabling sub-second search across unstructured document stores.",
        "Engineered and optimized high-throughput PL/SQL transactional procedures and integrated RESTful APIs with sub-second page performance."
    ]

    for bullet in path_bullets:
        c.setFont("Helvetica", 8.2)
        c.drawString(left + 6, y, "•")
        words = bullet.split(" ")
        line = ""
        for w in words:
            test = line + (" " if line else "") + w
            if c.stringWidth(test, "Helvetica", 8.2) < (content_width - 18):
                line = test
            else:
                c.drawString(left + 16, y, line)
                y -= 10.0
                line = w
        if line:
            c.drawString(left + 16, y, line)
            y -= 10.0

    y -= 7.0

    # AlmaMate Infotech
    c.setFont("Helvetica-Bold", 9.0)
    c.drawString(left, y, "AlmaMate Infotech Pvt. Ltd.")
    c.drawRightString(right, y, "July 2024 - August 2024")
    y -= 11.0

    c.setFont("Helvetica-Bold", 8.4)
    c.drawString(left, y, "MERN Stack Intern")
    y -= 10.2

    almamate_bullets = [
        "Collaborated in a team of developers to build web applications using MongoDB, Express.js, React.js, and Node.js.",
        "Designed and developed responsive client-side web pages using React.js and styled components with Bootstrap."
    ]

    for bullet in almamate_bullets:
        c.setFont("Helvetica", 8.2)
        c.drawString(left + 6, y, "•")
        words = bullet.split(" ")
        line = ""
        for w in words:
            test = line + (" " if line else "") + w
            if c.stringWidth(test, "Helvetica", 8.2) < (content_width - 18):
                line = test
            else:
                c.drawString(left + 16, y, line)
                y -= 10.0
                line = w
        if line:
            c.drawString(left + 16, y, line)
            y -= 10.0

    # 5. Projects
    y = draw_section_header("PROJECTS", y, gap_above=19.0)

    projects_data = [
        {
            "title": "Oracle APEX Enterprise Operations & Automation Portal",
            "desc": "Modernized high-throughput supply chain and data governance workflows into a unified reactive Oracle APEX cloud portal.",
            "tech": "Oracle APEX, PL/SQL, Oracle 19c/21c/26ai, RESTful APIs, JavaScript.",
            "contrib": "Engineered automated PL/SQL batch processing pipelines and interactive grids with custom dynamic actions."
        },
        {
            "title": "Enterprise Document Q&A & RAG Assistant",
            "desc": "Built an intelligent corporate document assistant enabling natural language queries over complex PDFs with zero hallucinations and page-exact citations.",
            "tech": "Next.js, TypeScript, Azure OpenAI, MongoDB Vector Search, Node.js, RAG.",
            "contrib": "Engineered hybrid vector chunking, cross-encoder re-ranking, and responsive Next.js citation overlays."
        },
        {
            "title": "Cognitive Knowledge Base & Live Handoff Bot",
            "desc": "Developed a multi-tenant AI support chatbot autonomously resolving customer inquiries with full conversation memory and seamless real-time WebSocket human agent escalation.",
            "tech": "React.js, Node.js, WebSockets, MongoDB, Semantic Embeddings, Azure OpenAI.",
            "contrib": "Implemented dynamic intent classification, sentiment analysis, and instant live agent takeover interface."
        },
        {
            "title": "Natural Language SQL & 3D Analytics Dashboard",
            "desc": "Created a conversational BI dashboard converting natural language queries into secure, validated SQL and real-time interactive charts with zero SQL injection risk.",
            "tech": "Next.js, Node.js, Oracle Database, SQL Query Engine, Chart.js, Tailored CSS.",
            "contrib": "Developed context-aware database schema grounding, query sanitization, and dynamic visual charts."
        }
    ]

    for idx, p in enumerate(projects_data):
        c.setFont("Helvetica-Bold", 8.6)
        c.drawString(left, y, p["title"])
        y -= 9.6

        # Description bullet
        c.setFont("Helvetica", 8.1)
        c.drawString(left + 6, y, "•")
        c.setFont("Helvetica-Bold", 8.1)
        c.drawString(left + 16, y, "Description : ")
        dw = c.stringWidth("Description : ", "Helvetica-Bold", 8.1)
        
        words = p["desc"].split(" ")
        line = ""
        first = True
        for w in words:
            test = line + (" " if line else "") + w
            target_w = (content_width - 16 - dw) if first else (content_width - 16)
            if c.stringWidth(test, "Helvetica", 8.1) < target_w:
                line = test
            else:
                c.setFont("Helvetica", 8.1)
                c.drawString(left + 16 + (dw if first else 0), y, line)
                y -= 9.4
                first = False
                dw = 0
                line = w
        if line:
            c.setFont("Helvetica", 8.1)
            c.drawString(left + 16 + (dw if first else 0), y, line)
            y -= 9.4

        # Technologies Used bullet
        c.setFont("Helvetica", 8.1)
        c.drawString(left + 6, y, "•")
        c.setFont("Helvetica-Bold", 8.1)
        c.drawString(left + 16, y, "Technologies Used : ")
        tw = c.stringWidth("Technologies Used : ", "Helvetica-Bold", 8.1)
        c.setFont("Helvetica", 8.1)
        c.drawString(left + 16 + tw, y, p["tech"])
        y -= 9.4

        # Contribution bullet
        c.setFont("Helvetica", 8.1)
        c.drawString(left + 6, y, "•")
        c.setFont("Helvetica-Bold", 8.1)
        c.drawString(left + 16, y, "Contribution : ")
        cw = c.stringWidth("Contribution : ", "Helvetica-Bold", 8.1)
        
        words = p["contrib"].split(" ")
        line = ""
        first = True
        for w in words:
            test = line + (" " if line else "") + w
            target_w = (content_width - 16 - cw) if first else (content_width - 16)
            if c.stringWidth(test, "Helvetica", 8.1) < target_w:
                line = test
            else:
                c.setFont("Helvetica", 8.1)
                c.drawString(left + 16 + (cw if first else 0), y, line)
                y -= 9.4
                first = False
                dw = 0
                line = w
        if line:
            c.setFont("Helvetica", 8.1)
            c.drawString(left + 16 + (cw if first else 0), y, line)
            y -= 9.4

        if idx < len(projects_data) - 1:
            y -= 5.5

    # 6. Education & Certifications (Full Width Stretched)
    y = draw_section_header("EDUCATION & CERTIFICATIONS", y, gap_above=20.0)

    # Degree 1
    c.setFont("Helvetica-Bold", 8.6)
    c.drawString(left, y, "Bachelor of Technology, CSE")
    c.drawRightString(right, y, "2021 - 2025")
    y -= 10.5
    c.setFont("Helvetica", 8.1)
    c.drawString(left, y, "Dr. A P J Abdul Kalam Technical University (AKTU) — IMS Engineering College, Ghaziabad")
    y -= 12.0

    # Intermediate & High School on clean stretched lines
    c.setFont("Helvetica-Bold", 8.6)
    c.drawString(left, y, "Intermediate")
    c.drawRightString(right, y, "2021")
    y -= 10.5
    c.setFont("Helvetica", 8.1)
    c.drawString(left, y, "S S SR Secondary School, Revelganj, Saran, Bihar")
    y -= 12.0

    c.setFont("Helvetica-Bold", 8.6)
    c.drawString(left, y, "High School")
    c.drawRightString(right, y, "2019")
    y -= 10.5
    c.setFont("Helvetica", 8.1)
    c.drawString(left, y, "St Joseph's Academy, Saran, Bihar")
    y -= 12.0

    # Certifications full width
    c.setFont("Helvetica-Bold", 8.4)
    c.drawString(left, y, "Certifications: ")
    cw_cert = c.stringWidth("Certifications: ", "Helvetica-Bold", 8.4)
    c.setFont("Helvetica", 8.1)
    c.drawString(left + cw_cert, y, "JavaScript Under The Hood (Codedamn)   •   HTML5 - The Language (Infosys Springboard)")
    y -= 9.0

    # 7. Extracurricular Activities (Shifted Down & Stretched Full Width)
    y = draw_section_header("EXTRACURRICULAR ACTIVITIES", y, gap_above=21.0)

    extra_items = [
        ("Captain, IMSEC Football Club", "IMS Engineering College, Ghaziabad"),
        ("Professional E-Sports Player", "Battlegrounds Mobile India (BGMI)"),
        ("Personal Portfolio", "Built 3D Interactive Personal Portfolio Website (Next.js, Three.js)")
    ]

    for title, subtitle in extra_items:
        c.setFont("Helvetica", 8.2)
        c.drawString(left + 6, y, "•")
        c.setFont("Helvetica-Bold", 8.2)
        c.drawString(left + 16, y, f"{title}: ")
        tw = c.stringWidth(f"{title}: ", "Helvetica-Bold", 8.2)
        c.setFont("Helvetica", 8.0)
        c.drawString(left + 16 + tw, y, subtitle)
        y -= 11.5

    c.showPage()
    c.save()
    print("Resume successfully generated at:", output_path, "Remaining bottom margin:", y)

if __name__ == "__main__":
    out1 = "D:/shubham-portfolio/portfolio-3d/Shubham Updated Resume.pdf"
    out2 = "D:/shubham-portfolio/portfolio-3d/public/Shubham Updated Resume.pdf"
    generate_resume(out1)
    generate_resume(out2)
