"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_EAMMU_API_KEY;
const BASE    = "https://api.eammu.com/api/v1";

const STATUS_META = {
  "visa-required":   { color: "#DC2626", light: "#FEF2F2", label: "Student Visa Required",  icon: "📋" },
  "e-visa":          { color: "#2563EB", light: "#EFF6FF", label: "E-Visa for Study",        icon: "💻" },
  "visa-on-arrival": { color: "#059669", light: "#ECFDF5", label: "Visa on Arrival (Study)", icon: "✈️" },
  "eta":             { color: "#7C3AED", light: "#F5F3FF", label: "ETA for Study",           icon: "⚡" },
  "visa-free":       { color: "#0891B2", light: "#ECFEFF", label: "Visa-Free Study Access",  icon: "🆓" },
  "no-admission":    { color: "#B45309", light: "#FFFBEB", label: "Entry Not Permitted",      icon: "🚫" },
};

function getStatusContent(statusSlug, dest, from) {
  const base = {
    quickStats: [
      { icon: "⏱️", label: "Processing Time", val: "4–12 Weeks"     },
      { icon: "💰", label: "Embassy Fee",      val: "Check Embassy"  },
      { icon: "📅", label: "Apply Before",     val: "3 Months Ahead" },
      { icon: "🌐", label: "IELTS Minimum",    val: "6.0–7.0"        },
      { icon: "🏛️", label: "Submission",       val: "Embassy / VFS"  },
      { icon: "✈️", label: "Post-Study Work",  val: "Permit Available"},
    ],
    costs: [
      { label: "Student Visa Application Fee",      range: "Varies by country",  note: "Canada: CAD 150. UK: GBP 363. Australia: AUD 710. Germany: €75." },
      { label: "Biometric Fee (VFS/BLS)",           range: "USD 30–85",          note: "Payable at visa application centre." },
      { label: "Student Health Insurance",          range: "USD 500–2,500/yr",   note: "Mandatory. UK IHS: GBP 470/yr. Australia OSHC: ~AUD 500/yr." },
      { label: "Medical Examination",               range: "USD 80–200",         note: "Approved Panel Physician in home country." },
      { label: "IELTS / English Test",              range: "USD 200–250",        note: "Required for university and study permit." },
      { label: "Document Translation/Notarisation", range: "USD 20–80/doc",     note: "Academic docs not in English must be certified." },
      { label: "SOP Professional Writing",          range: "Included with Eammu",note: "Free with full student visa package." },
    ],
  };

  switch (statusSlug) {
    case "visa-required": return { ...base,
      heroSubtitle: `${from} citizens must apply for a full Student Visa at the ${dest} Embassy — before departure`,
      seoH1: `${from} Student Visa for ${dest} 2026 — Requirements, Documents & Application Process`,
      introTitle: `${dest} Student Visa for ${from} Citizens — Embassy Application Required`,
      introParas: [
        `As a ${from} passport holder, you must obtain a formal ${dest} Student Visa before enrolling in any full-time course. This is applied for at the ${dest} Embassy or authorised Visa Application Centre (VFS Global / BLS International) in your home country — you cannot arrive and switch status.`,
        `The application requires a confirmed university acceptance letter, financial documentation, English language scores, a medical examination, and a compelling Statement of Purpose. The embassy assesses whether you are a genuine student who will return home after graduation.`,
        `Processing takes 4–12 weeks. Apply at least 3 months before your course start date. Eammu Holidays provides end-to-end support — from university shortlisting to embassy follow-up.`,
      ],
      alertBox: { type: "warning", icon: "⚠️", text: `${from} citizens need both a travel visa AND a student permit for ${dest}. Eammu Holidays can process both simultaneously to save time.` },
      docs: [
        { icon: "📨", title: "University Acceptance Letter",       required: true,  desc: `Original from a recognised ${dest} institution. Must state your full name, program, start date, duration, and fees on official letterhead.` },
        { icon: "🎓", title: "Academic Transcripts & Certificates",required: true,  desc: `All records from SSC through your highest qualification. Attested and translated into English by a certified translator.` },
        { icon: "🌐", title: "English Language Certificate",       required: true,  desc: `IELTS 6.0–7.0 or TOEFL 80–100. Valid within last 2 years. Score report sent directly to institution and copy submitted with visa.` },
        { icon: "🛂", title: `Valid ${from} Passport`,             required: true,  desc: `Valid for full course duration plus 6 months. Submit all previously held expired passports too.` },
        { icon: "📸", title: "Passport Photographs",               required: true,  desc: `Canada: 50×70mm. UK: 45×35mm. Australia: 45×35mm. White background, no glasses, within last 6 months.` },
        { icon: "💰", title: "Bank Statement (6 Months)",          required: true,  desc: `Bank stamp on every page. Consistent balance covering tuition + living costs for full course duration.` },
        { icon: "📋", title: "Bank Solvency Certificate",          required: true,  desc: `On bank letterhead, signed by manager. Dated within 30 days of application.` },
        { icon: "✍️", title: "Statement of Purpose (SOP)",        required: true,  desc: `500–1,000 words. Why this course, this university, your career goals, and strong intention to return to ${from}. Eammu offers SOP writing.` },
        { icon: "💊", title: "Medical Examination Certificate",    required: true,  desc: `From a ${dest} embassy-approved Panel Physician in ${from}. Includes TB test. Valid 12 months.` },
        { icon: "🛡️", title: "Student Health Insurance",         required: true,  desc: `UK: IHS surcharge. Australia: OSHC. Canada: private or provincial. Must be confirmed before visa issued.` },
        { icon: "🏠", title: "Proof of Accommodation",            required: true,  desc: `University housing letter or rental agreement showing address and dates for first term.` },
        { icon: "📋", title: "NOC from Employer (If Employed)",   required: false, desc: `If currently employed in ${from}, an NOC confirming approved leave for full study duration.` },
      ],
      steps: [
        { num:"01", icon:"🎯", title:"Research & Shortlist Universities",  time:"1–3 months",        body:`Find accredited institutions on the official approved list (DLI/CRICOS/Tier 4). Check IELTS minimums, tuition, scholarships, and post-study work rights.` },
        { num:"02", icon:"🌐", title:"Complete English Language Test",     time:"2–3 months ahead",  body:`Sit IELTS/TOEFL/PTE. Send official score reports to your chosen university. Allow time for retake if needed.` },
        { num:"03", icon:"📝", title:"Apply to Universities",              time:"Apply early",       body:`Submit through university portals. Apply to 3–5 to maximise chances. Include transcripts, SOP, and test scores.` },
        { num:"04", icon:"📨", title:"Receive Offer & Pay Deposit",        time:"2–6 weeks",         body:`Review your offer letter carefully. Pay deposit to secure your place. This letter is the most critical visa document.` },
        { num:"05", icon:"💰", title:"Arrange Financial Documentation",    time:"3–6 months ahead",  body:`Maintain consistent bank balance for 6 months. Get bank solvency certificate dated within 30 days.` },
        { num:"06", icon:"✍️", title:"Write Statement of Purpose",        time:"2 weeks",           body:`Explain your academic background, why this course and university, career goals, and strong ties to ${from}.` },
        { num:"07", icon:"💊", title:"Complete Medical Examination",       time:"2–4 weeks",         body:`Book with embassy-approved physician in ${from}. Include TB test. Results valid 12 months.` },
        { num:"08", icon:"🛡️", title:"Purchase Student Health Insurance", time:"1 day",             body:`UK: pay IHS surcharge online. Australia: buy OSHC. Canada: arrange on arrival. Confirm before submission.` },
        { num:"09", icon:"📁", title:"Compile & Verify All Documents",     time:"1 week",            body:`Check bank stamps on every page, correct photo sizes, latest form version, and consistent dates across all documents.` },
        { num:"10", icon:"💻", title:"Submit Online Visa Application",     time:"1–2 hours",         body:`IRCC (Canada), UKVI (UK), ImmiAccount (Australia). Upload all documents, pay visa fee, note reference number.` },
        { num:"11", icon:"🏛️", title:"Attend Biometrics Appointment",     time:"Day of appt.",      body:`Visit VFS Global or BLS International. Bring originals of all documents for fingerprints and photo.` },
        { num:"12", icon:"✅", title:"Receive Visa & Prepare Departure",   time:"4–12 weeks later",  body:`Verify all visa details — name, course, institution, dates. Book accommodation and flights only after approval.` },
      ],
      rejections: [
        { icon:"📝", title:"Weak Statement of Purpose",          desc:"Generic SOP without clear academic intent or a credible post-graduation return plan." },
        { icon:"💰", title:"Insufficient Financial Proof",       desc:"Balance too low, inconsistent history, unstamped bank pages, or sudden large pre-application deposits." },
        { icon:"🏠", title:"Weak Ties to Home Country",          desc:"No evidence of family, employment, or property in ${from} confirming the applicant will return after studies." },
        { icon:"📄", title:"Incomplete or Wrong Documents",      desc:"Missing medical cert, wrong photo size, expired IELTS, or submitted on outdated form version." },
        { icon:"🎓", title:"Non-Recognised Institution",         desc:`University not on ${dest}'s official approved list (DLI/CRICOS/Tier 4). Verify before paying deposits.` },
        { icon:"🌐", title:"Below-Minimum English Score",        desc:"IELTS or TOEFL below the course or visa threshold for that country." },
        { icon:"🔍", title:"Undisclosed Previous Refusals",      desc:"Failing to declare prior visa refusals from any country — grounds for permanent ban." },
        { icon:"📊", title:"Unexplained Course Change",          desc:"Applying for a field very different from previous studies without clear SOP explanation." },
      ],
      faqs: [
        { q:`How long does a ${dest} student visa take for ${from} citizens?`, a:`Canada: 4–12 weeks. UK: 3 weeks. Australia: 4–6 weeks. Germany: 4–12 weeks. Apply at least 3 months before course start.` },
        { q:`What IELTS score is needed for a ${dest} student visa?`, a:`Canada: 6.0–6.5. UK: 5.5–6.5. Australia: 5.5–7.0. Germany: 6.0+. Scores must be within the last 2 years.` },
        { q:`Can I work while studying in ${dest}?`, a:`Canada: 20 hrs/week. UK: 20 hrs/week (postgrad). Australia: 48 hrs/fortnight. Germany: 120 full days/year.` },
        { q:`Can I bring my family to ${dest}?`, a:`Canada allows spousal open work permits. UK allows dependants for 9+ month postgrad. Australia allows dependant sub-visas. Germany allows family reunification.` },
        { q:`What after graduating from ${dest}?`, a:`Canada: PGWP up to 3 years. UK: Graduate Route 2 years. Australia: Temporary Graduate Visa 2–4 years. Germany: 18-month job-seeker visa.` },
        { q:`What if my application is refused?`, a:`Identify the reason, strengthen documents and SOP, wait 2–4 weeks, reapply. Eammu Holidays specialises in refusal resubmissions.` },
      ],
      checklist: [
        { category:"Before University Application", icon:"🎓", items:["Choose DLI/CRICOS/Tier 4 accredited university","Check IELTS minimum for your course","Budget for tuition + living costs","Sit IELTS/TOEFL and achieve required score","Notarise all academic transcripts"] },
        { category:"Documents to Prepare", icon:"📁", items:["Acceptance letter","6-month bank statement — stamped every page","Bank solvency certificate (within 30 days)","Statement of Purpose — 500–1,000 words","Medical exam from approved physician","Health insurance confirmed","Correct passport photos","NOC from employer if employed"] },
        { category:"Submission Day", icon:"🏛️", items:["Book VFS/BLS biometrics appointment","Pay visa fee and IHS surcharge online","Upload all documents to portal","Keep reference number","Bring originals to biometrics"] },
        { category:"After Approval", icon:"✅", items:["Verify all visa details","Book accommodation","Buy travel insurance","Contact university for orientation","Open international bank account on arrival"] },
      ],
    };

    case "e-visa": return { ...base,
      heroSubtitle: `${from} citizens get an entry e-visa online first — then apply for a Student Permit separately to study full-time in ${dest}`,
      seoH1: `${from} Student Visa for ${dest} 2026 — E-Visa Entry Plus Study Permit Complete Guide`,
      introTitle: `${dest} E-Visa for ${from} Students — Two-Step Entry and Study Process`,
      introParas: [
        `${from} citizens can obtain a ${dest} e-visa online for entry — but this only authorises tourism or short visits. To study full-time, you must additionally apply for a Student Visa or Study Permit either before departure or after arriving on the e-visa.`,
        `Two steps: (1) Apply for the ${dest} e-visa online for entry, (2) Apply for the Student Permit through the immigration authority. Some countries allow converting the e-visa to a student permit after arrival — Eammu Holidays will advise the correct sequence for your specific destination.`,
        `The e-visa is typically approved within hours to 72 hours at low cost — giving you fast, flexible entry. The study permit application then follows the standard documentation process.`,
      ],
      alertBox: { type: "info", icon: "💻", text: `E-visa = entry permission only. You still need a Student Permit to enrol full-time. Apply for the e-visa first, then the study permit. Eammu Holidays manages both steps.` },
      quickStats: [
        { icon:"💻", label:"E-Visa Approval",  val:"Hours – 72 Hrs"    },
        { icon:"📅", label:"Study Permit",      val:"4–8 Weeks Extra"   },
        { icon:"💰", label:"E-Visa Fee",        val:"USD 15–100"        },
        { icon:"🌐", label:"IELTS Minimum",     val:"6.0–7.0"           },
        { icon:"🔄", label:"Conversion",        val:"Possible In-Country"},
        { icon:"✈️", label:"Post-Study Work",   val:"Permit Available"  },
      ],
      docs: [
        { icon:"💻", title:"E-Visa Application (Step 1)",           required:true,  desc:`Apply on official ${dest} e-visa portal. Need: passport scan, digital photo, travel dates, accommodation address, debit/credit card. Approval hours to 72 hrs.` },
        { icon:"📨", title:"University Acceptance Letter (Step 2)", required:true,  desc:`For study permit: original from accredited ${dest} institution. Core document transitioning your status from visitor to student.` },
        { icon:"🎓", title:"Academic Transcripts & Certificates",   required:true,  desc:`All academic records attested and translated into English for study permit application.` },
        { icon:"🌐", title:"English Language Score",                required:true,  desc:`IELTS/TOEFL minimum required by institution and immigration. Valid within 2 years.` },
        { icon:"🛂", title:`Valid ${from} Passport`,                required:true,  desc:`E-visa linked electronically to your passport. Must be valid for full course duration plus 6 months.` },
        { icon:"📸", title:"Digital Photo for E-Visa",              required:true,  desc:`White background, no glasses, JPEG under 200KB. Check pixel dimensions on the official portal.` },
        { icon:"💰", title:"Financial Proof for Study Permit",      required:true,  desc:`6-month bank statements for study permit stage — not needed for initial e-visa.` },
        { icon:"✍️", title:"Statement of Purpose (SOP)",           required:true,  desc:`For study permit stage. Explains academic goals and intention to return to ${from} after studies.` },
        { icon:"💊", title:"Medical Examination",                   required:true,  desc:`For study permit. Complete at approved physician in ${from} before departure if possible.` },
        { icon:"🛡️", title:"Student Health Insurance",             required:true,  desc:`Required for study permit. Australia OSHC before arrival; Canada/UK — on arrival or during application.` },
      ],
      steps: [
        { num:"01", icon:"🎯", title:"Select Accredited University",        time:"1–3 months",       body:`Verify institution is on official approved list. Check IELTS, tuition, and post-study work rights.` },
        { num:"02", icon:"🌐", title:"Complete English Language Test",      time:"2–3 months ahead", body:`Sit IELTS/TOEFL/PTE. Send score report directly to university.` },
        { num:"03", icon:"📝", title:"Apply to University & Get Offer",    time:"Apply early",      body:`Submit application. Pay deposit on acceptance to secure place.` },
        { num:"04", icon:"💻", title:"Apply for E-Visa Online",            time:"2+ weeks before",  body:`Official ${dest} e-visa portal. Upload passport scan, photo, travel details. Pay fee. Approval hours to 72 hrs.` },
        { num:"05", icon:"💰", title:"Prepare Financial & Study Docs",     time:"Ongoing",          body:`Arrange 6-month bank statements, health insurance, medical exam before departure.` },
        { num:"06", icon:"✍️", title:"Write Statement of Purpose",        time:"2 weeks",          body:`For study permit. Focus on academic goals, career plan, and return to ${from} after graduation.` },
        { num:"07", icon:"💊", title:"Complete Medical Examination",       time:"2–4 weeks",        body:`Approved physician in ${from}. Include TB test. Valid 12 months.` },
        { num:"08", icon:"✈️", title:"Travel on E-Visa",                  time:"Day of travel",    body:`Enter ${dest} on e-visa. Carry all study permit documents — border officers may ask about study plans.` },
        { num:"09", icon:"📁", title:"Apply for Study Permit After Arrival",time:"Within first week",body:`Submit through ${dest} immigration portal or local office. Do not attend classes yet.` },
        { num:"10", icon:"✅", title:"Receive Permit & Enrol",             time:"4–8 weeks",        body:`Once permit issued, formally enrol. Check all details — program, dates, work hours allowed.` },
      ],
      rejections: [
        { icon:"💻", title:"Studying on E-Visa Without Permit",   desc:"Enrolling full-time before study permit is issued — immigration violation, can result in deportation." },
        { icon:"📝", title:"Weak Statement of Purpose",           desc:"No clear academic intent or failure to show intention to return home." },
        { icon:"💰", title:"Insufficient Financial Proof",        desc:"Bank balance too low or inconsistent history at study permit stage." },
        { icon:"🎓", title:"Non-Accredited Institution",          desc:`University not on ${dest}'s official approved list.` },
        { icon:"📄", title:"Incomplete Study Permit Documents",   desc:"Missing medical cert, health insurance, or incomplete acceptance letter." },
        { icon:"⏰", title:"Studying Before Permit Approved",     desc:"Starting classes before permit approval — even if applied for — creates compliance issues." },
      ],
      faqs: [
        { q:`Can I study in ${dest} immediately after getting the e-visa?`, a:`No. E-visa only authorises entry for short stays. Apply for and receive a Study Permit before enrolling.` },
        { q:`Can I convert my ${dest} e-visa to a student visa after arrival?`, a:`In many countries yes — Canada, Australia, Germany allow in-country status changes. UK generally requires applying from outside. Eammu Holidays advises the correct process.` },
        { q:`How long does the ${dest} e-visa take to approve?`, a:`Most approve within hours. Apply at least 2 weeks before travel as a precaution.` },
        { q:`Do I need IELTS for the e-visa?`, a:`No — IELTS is only needed for the university application and study permit, not the entry e-visa.` },
        { q:`What if my study permit is refused after arriving on e-visa?`, a:`You must leave before e-visa expires and reapply with stronger documentation. Eammu Holidays specialises in resubmission cases.` },
      ],
      checklist: [
        { category:"E-Visa Stage (Entry)", icon:"💻", items:["Valid passport scan (JPEG) ready","Digital photo — white background under 200KB","Travel dates and accommodation confirmed","Credit/debit card for e-visa fee","Apply on official government portal only"] },
        { category:"Study Permit Documents", icon:"📁", items:["University acceptance letter (original)","6-month bank statement — stamped every page","English test score report (within 2 years)","Statement of Purpose — typed and signed","Medical exam from approved physician","Health insurance confirmed","Passport photos — correct dimensions"] },
        { category:"Before Travel", icon:"✈️", items:["Save e-visa approval on phone","Carry all study permit docs in hand luggage","Inform border officer of study plans","Accommodation arranged for first weeks"] },
        { category:"After Arrival", icon:"✅", items:["Apply for study permit within first week","Do NOT enrol until permit issued","Track permit status online","Attend orientation only until permit received"] },
      ],
      costs: [
        { label:"E-Visa Fee",                    range:"USD 15–100",         note:"Paid online — non-refundable. Check official portal." },
        { label:"Study Permit Application Fee",  range:"Varies by country",  note:"Canada: CAD 150. Australia: AUD 710. Germany: €75." },
        { label:"Health Insurance (OSHC/IHS)",   range:"USD 500–2,500/yr",   note:"Mandatory for study permit." },
        { label:"Medical Examination",           range:"USD 80–200",         note:"Complete before departure in home country." },
        { label:"IELTS / English Test",          range:"USD 200–250",        note:"Required for university and study permit." },
        { label:"Biometrics (if required)",      range:"USD 30–85",          note:"Some destinations require biometrics for permit." },
        { label:"SOP Writing",                   range:"Included with Eammu",note:"Free with full student visa service." },
      ],
    };

    case "visa-on-arrival": return { ...base,
      heroSubtitle: `${from} citizens enter ${dest} on Visa on Arrival — then convert to a Student Permit locally to study full-time`,
      seoH1: `${from} Student Visa for ${dest} 2026 — Visa on Arrival Entry and Study Permit Conversion Guide`,
      introTitle: `Studying in ${dest} on ${from} Passport — Visa on Arrival Then Student Permit`,
      introParas: [
        `${from} citizens are eligible for a Visa on Arrival (VOA) at ${dest} ports of entry — making the initial travel straightforward. However, the VOA is for tourism only. To study full-time you must convert your status to a Student Permit at the local immigration authority after arrival.`,
        `This is one of the more flexible student pathways — you enter ${dest} without embassy appointments, settle in, and complete your study permit formalities locally. The conversion involves submitting your acceptance letter and supporting documents at the local immigration office.`,
        `Do not begin classes before your study permit is issued. Studying on a VOA alone is an immigration violation and can result in deportation and future visa bans.`,
      ],
      alertBox: { type:"success", icon:"✈️", text:`Advantage: Enter ${dest} without prior embassy appointment. Focus budget on the study permit. Must obtain permit before attending any formal classes.` },
      quickStats: [
        { icon:"✈️", label:"VOA on Arrival",  val:"Same Day"           },
        { icon:"📅", label:"Study Permit",     val:"Apply After Arrival"},
        { icon:"💰", label:"VOA Fee",          val:"USD 20–100 cash"    },
        { icon:"🌐", label:"IELTS Minimum",    val:"6.0–7.0"            },
        { icon:"🔄", label:"Conversion",       val:"In-Country Process" },
        { icon:"✈️", label:"Post-Study Work",  val:"Permit Available"   },
      ],
      docs: [
        { icon:"✈️", title:"Visa on Arrival Requirements",             required:true,  desc:`At port of entry: valid passport (6+ months), completed VOA form, passport photo, VOA fee in cash (USD/EUR/local), return ticket, accommodation proof. Carry university letter in case asked.` },
        { icon:"📨", title:"University Acceptance Letter",             required:true,  desc:`For study permit conversion: original offer from accredited ${dest} institution. Show at border if asked about study plans.` },
        { icon:"🎓", title:"Academic Transcripts & Certificates",      required:true,  desc:`For study permit: all records attested and translated into English. Bring originals and certified copies.` },
        { icon:"🌐", title:"English Language Score",                   required:true,  desc:`IELTS/TOEFL minimum required. Bring score report with you on arrival.` },
        { icon:"💰", title:"6-Month Bank Statement",                   required:true,  desc:`For study permit: originals and certified copies. Carry when travelling to ${dest}.` },
        { icon:"✍️", title:"Statement of Purpose (SOP)",              required:true,  desc:`Prepare before departure. Required for study permit application at local immigration office.` },
        { icon:"💊", title:"Medical Examination",                      required:true,  desc:`Complete in ${from} before departure if possible to avoid delay after arrival.` },
        { icon:"🛡️", title:"Student Health Insurance",               required:true,  desc:`Purchase before or immediately on arrival. Required for study permit.` },
        { icon:"🏠", title:"Proof of Accommodation",                  required:true,  desc:`University housing or rental agreement. Required for both VOA and study permit.` },
        { icon:"💳", title:"Cash for VOA Fee",                        required:true,  desc:`VOA fees USD 20–100 in cash. Carry USD or EUR for smaller entry points where ATMs may not be available.` },
      ],
      steps: [
        { num:"01", icon:"🎯", title:"Select Accredited University",          time:"1–3 months",         body:`Verify institution on official approved list. Confirm they accept ${from} students and course qualifies for study permit.` },
        { num:"02", icon:"🌐", title:"Complete English Language Test",        time:"2–3 months ahead",   body:`Sit IELTS/TOEFL/PTE. Send score to university. Bring report with you to ${dest}.` },
        { num:"03", icon:"📝", title:"Apply & Get University Offer",          time:"Apply early",        body:`Submit application. Pay deposit on acceptance. Carry original offer letter when you travel.` },
        { num:"04", icon:"💰", title:"Prepare Financial Documents",           time:"Ongoing",            body:`Bank statements, solvency cert, sponsor letter. Carry originals and certified copies.` },
        { num:"05", icon:"✍️", title:"Write SOP & Prepare All Documents",    time:"2–3 weeks",          body:`Complete SOP, medical exam, health insurance. Pack all originals in hand luggage.` },
        { num:"06", icon:"✈️", title:"Fly to ${dest} — Get VOA at Entry",   time:"Day of travel",      body:`Complete VOA form, pay fee in cash, show return ticket and accommodation. Border officer may ask about study plans — show acceptance letter.` },
        { num:"07", icon:"🏫", title:"Register with University",              time:"Days 1–3",           body:`Visit international student office. They guide you on the study permit process and often assist with submission.` },
        { num:"08", icon:"📁", title:"Apply for Study Permit Locally",        time:"Within 1–2 weeks",   body:`Submit at ${dest} immigration office or online portal. Include all documents — acceptance letter, bank statements, SOP, insurance, medical results.` },
        { num:"09", icon:"⏳", title:"Wait for Permit Approval",              time:"2–8 weeks",          body:`Do NOT begin formal classes. You may attend orientation and preparatory activities only.` },
        { num:"10", icon:"✅", title:"Receive Permit & Enrol",                time:"After approval",     body:`Formally enrol once permit granted. Note expiry date and work hour conditions.` },
      ],
      rejections: [
        { icon:"🎓", title:"Attending Classes Before Permit Issued",   desc:"Enrolling before study permit is issued — immigration violation even if application is pending." },
        { icon:"⏰", title:"VOA Expired Before Permit Approved",        desc:"If VOA expires before permit issued, you must leave or extend. Plan timing carefully." },
        { icon:"📄", title:"Incomplete Study Permit Documents",         desc:"Missing medical cert, unstamped bank statements, or insufficient financial proof." },
        { icon:"🏫", title:"Non-Recognised Institution",               desc:`University not on ${dest}'s approved list for study permits.` },
        { icon:"💰", title:"Insufficient Funds Shown at Border",       desc:"Immigration officers at VOA counters may ask for proof of funds. Carry bank statement printout." },
        { icon:"📝", title:"Weak SOP at Permit Stage",                 desc:"No clear academic intent or career plan." },
      ],
      faqs: [
        { q:`Can ${from} citizens study in ${dest} on a visa on arrival?`, a:`No — VOA is tourism only. After arriving on VOA you must apply for a Study Permit from local immigration before beginning any formal classes.` },
        { q:`How long does the study permit conversion take in ${dest}?`, a:`Typically 2–8 weeks after submitting at the local immigration office. Do not begin classes until permit is in hand.` },
        { q:`What documents should I carry when arriving on VOA?`, a:`Passport, VOA form, university acceptance letter, return ticket, accommodation proof, VOA fee in cash. Also carry full study permit document set.` },
        { q:`What if my VOA expires before study permit is approved?`, a:`Extend VOA at immigration office or briefly leave and re-enter. Eammu Holidays advises on exact procedures for each destination.` },
        { q:`Can I work while studying in ${dest}?`, a:`Work rights depend on study permit conditions, not VOA status. Most countries allow 20–48 hours per week. Check your permit conditions.` },
      ],
      checklist: [
        { category:"Before Departure", icon:"🧳", items:["University acceptance letter (original)","All transcripts attested + translated","6-month bank statement — stamped every page","SOP — typed and signed","Medical exam completed","Health insurance purchased","Cash for VOA fee (USD/EUR)","Return ticket booked"] },
        { category:"On Arrival (VOA Counter)", icon:"✈️", items:["Complete VOA form","Pay VOA fee in cash","Show return ticket and accommodation","Present university letter if asked","Note VOA expiry date from stamp"] },
        { category:"First Week in ${dest}", icon:"📁", items:["Visit university international office","Apply for study permit immediately","Do NOT attend formal classes","Track permit application status","Arrange local SIM and bank account"] },
        { category:"After Study Permit Issued", icon:"✅", items:["Formally enrol at university","Note permit expiry date","Check work hour conditions","Set renewal reminder"] },
      ],
      costs: [
        { label:"Visa on Arrival Fee",          range:"USD 20–100 cash",    note:"Paid at border. Carry exact amount." },
        { label:"Study Permit Application Fee", range:"Varies by country",  note:"Paid locally at immigration office after arrival." },
        { label:"Student Health Insurance",     range:"USD 300–2,500/yr",   note:"Varies by country and coverage level." },
        { label:"Medical Examination",          range:"USD 80–200",         note:"Complete in home country before departure if possible." },
        { label:"IELTS / English Test",         range:"USD 200–250",        note:"Required for university and study permit." },
        { label:"Document Notarisation",        range:"USD 20–80/doc",      note:"Academic documents in other languages need certified translation." },
        { label:"Eammu Consultation",           range:"Free initial",       note:"Full student visa service package available." },
      ],
    };

    case "eta": return { ...base,
      heroSubtitle: `${from} citizens need an ETA to board a flight to ${dest} — then apply for a Student Permit separately to study full-time`,
      seoH1: `${from} Student Visa for ${dest} 2026 — ETA Entry Authorization Plus Study Permit Complete Guide`,
      introTitle: `${dest} ETA for ${from} Students — Electronic Travel Auth and Study Permit Explained`,
      introParas: [
        `An Electronic Travel Authorization (ETA) is a pre-approved electronic entry permission linked to your ${from} passport — mandatory before boarding any flight to ${dest}. It is not a visa stamp; it is electronically linked to your passport. The ETA authorises entry but does not permit full-time study.`,
        `Two steps: (1) Apply for the ETA online — typically approved within minutes to 72 hours at a low fee. (2) After arriving in ${dest}, apply for the Student Permit through the immigration portal or local office. The study permit application requires all standard student documentation.`,
        `Do not begin classes until the study permit is officially granted. Apply for the study permit immediately on arrival — do not wait until the ETA stay period is almost over.`,
      ],
      alertBox: { type:"purple", icon:"⚡", text:`ETA is usually approved instantly. Apply at least 72 hours before flying. After entering ${dest}, apply for the Study Permit immediately — processing takes 4–8 weeks.` },
      quickStats: [
        { icon:"⚡", label:"ETA Approval",    val:"Minutes – 72 Hrs"  },
        { icon:"📅", label:"Study Permit",    val:"4–8 Weeks"         },
        { icon:"💰", label:"ETA Fee",         val:"USD 7–30"          },
        { icon:"🌐", label:"IELTS Minimum",   val:"6.0–7.0"           },
        { icon:"🔄", label:"Conversion",      val:"Apply In-Country"  },
        { icon:"✈️", label:"Post-Study Work", val:"Permit Available"  },
      ],
      docs: [
        { icon:"⚡", title:"ETA Application (Step 1 — Online)",        required:true,  desc:`Official ${dest} ETA portal. Need: passport number, email, credit/debit card, travel dates. Approval minutes to 72 hrs. ETA linked electronically to passport.` },
        { icon:"📨", title:"University Acceptance Letter (Step 2)",    required:true,  desc:`For study permit: original from accredited ${dest} institution. Bring with you when travelling.` },
        { icon:"🎓", title:"Academic Transcripts & Certificates",      required:true,  desc:`All records attested and translated. For study permit application after arrival.` },
        { icon:"🌐", title:"English Language Score",                   required:true,  desc:`Minimum IELTS/TOEFL required by institution and immigration. Valid within 2 years.` },
        { icon:"🛂", title:`Valid ${from} Passport`,                   required:true,  desc:`ETA linked to your passport electronically. Valid for full course duration plus 6 months.` },
        { icon:"💰", title:"6-Month Bank Statement",                   required:true,  desc:`For study permit. Carry originals and certified copies when travelling.` },
        { icon:"✍️", title:"Statement of Purpose (SOP)",              required:true,  desc:`For study permit stage. Prepare before departure to submit quickly after arrival.` },
        { icon:"💊", title:"Medical Examination",                      required:true,  desc:`Complete in ${from} before departure at approved physician. Valid 12 months.` },
        { icon:"🛡️", title:"Student Health Insurance",               required:true,  desc:`Purchase before applying for study permit. Some countries require proof before processing permit.` },
        { icon:"📸", title:"Digital Photo (ETA) + Physical (Permit)", required:true,  desc:`Digital JPEG for ETA portal. Physical passport photos for study permit — check ${dest}-specific sizes.` },
      ],
      steps: [
        { num:"01", icon:"🎯", title:"Select Accredited University",       time:"1–3 months",        body:`Verify institution on ${dest}'s official approved list. Check IELTS, tuition, post-study work rights.` },
        { num:"02", icon:"🌐", title:"Complete English Language Test",     time:"2–3 months ahead",  body:`Sit IELTS/TOEFL/PTE. Send score to university.` },
        { num:"03", icon:"📝", title:"Apply to University & Get Offer",   time:"Apply early",       body:`Submit application. Pay deposit on acceptance. This letter is essential for study permit.` },
        { num:"04", icon:"⚡", title:"Apply for ETA Online",              time:"72 hrs before flight",body:`Official ${dest} ETA portal. Enter passport details, answer screening questions, pay ETA fee. Approval usually instant to 72 hrs.` },
        { num:"05", icon:"💰", title:"Prepare Financial & Study Docs",    time:"Ongoing",           body:`Arrange bank statements, health insurance, and complete medical exam before departure.` },
        { num:"06", icon:"✈️", title:"Travel to ${dest} on ETA",         time:"Day of travel",     body:`No stamp needed — ETA is electronic. At immigration, state purpose. Carry all study documents in case of secondary screening.` },
        { num:"07", icon:"📁", title:"Apply for Study Permit Immediately",time:"Within first week", body:`Submit through ${dest} immigration portal or local office. Do not wait — ETA stay period begins on arrival.` },
        { num:"08", icon:"⏳", title:"Wait for Study Permit",             time:"4–8 weeks",         body:`Attend orientation but do NOT formally enrol until permit issued.` },
        { num:"09", icon:"✅", title:"Receive Permit & Enrol",            time:"After approval",    body:`Formally enrol once permit granted. Check all details — program, dates, work hour conditions.` },
      ],
      rejections: [
        { icon:"⚡", title:"ETA Denied — Undisclosed Refusals",  desc:"Prior visa refusals from any country not disclosed on ETA application can cause denial." },
        { icon:"🎓", title:"Enrolling Before Study Permit",      desc:"Attending formal classes before the permit is granted — immigration violation." },
        { icon:"⏰", title:"ETA Expires Before Permit Issued",   desc:"Apply for study permit immediately on arrival. If ETA expires first, you must leave and re-enter." },
        { icon:"📄", title:"Incomplete Permit Documents",        desc:"Missing medical exam, insufficient financial proof, or wrong health insurance at permit stage." },
        { icon:"🏫", title:"Non-Approved Institution",           desc:`University not on ${dest}'s approved study permit list.` },
        { icon:"📝", title:"Weak SOP at Permit Stage",           desc:"Insufficient explanation of academic goals and return intention." },
      ],
      faqs: [
        { q:`What is an ETA and do I need it to study in ${dest}?`, a:`An ETA is a pre-approved electronic entry permission — mandatory before flying to ${dest}. It only authorises entry, not study. You need a separate Study Permit to enrol.` },
        { q:`How long does a ${dest} ETA take?`, a:`Most are approved within minutes. Apply at least 72 hours before your flight.` },
        { q:`Can I apply for the study permit before arriving in ${dest}?`, a:`Some countries allow it. Others require in-country application. Eammu Holidays advises the correct sequence for your specific destination.` },
        { q:`What if my ETA is denied?`, a:`Usually due to undisclosed travel history. Eammu Holidays can help apply for a standard entry visa instead, which involves more documentation but is achievable for most applicants.` },
        { q:`Can I work during my studies?`, a:`Work rights are specified on your study permit — not the ETA. Most countries allow 20–48 hours per week during term time.` },
      ],
      checklist: [
        { category:"ETA Stage", icon:"⚡", items:["Apply on official ${dest} ETA portal","Valid passport number ready","Credit/debit card for ETA fee","Apply minimum 72 hrs before flight","Save ETA confirmation"] },
        { category:"Study Permit Documents", icon:"📁", items:["University acceptance letter (original)","6-month bank statement — stamped every page","English test score report (within 2 years)","SOP — typed and signed","Medical exam from approved physician","Health insurance confirmed","Correct passport photos"] },
        { category:"After Arriving", icon:"✈️", items:["Apply for study permit within first week","Do NOT formally enrol until permit issued","Track application status online","Attend orientation only"] },
        { category:"After Permit Issued", icon:"✅", items:["Formally enrol","Check all permit details","Note expiry date for renewal","Check work hour allowance"] },
      ],
      costs: [
        { label:"ETA Fee",                    range:"USD 7–30",           note:"Paid online. Linked to passport electronically." },
        { label:"Study Permit Fee",           range:"Varies by country",  note:"Canada: CAD 150. Australia: AUD 710. Germany: €75." },
        { label:"Student Health Insurance",   range:"USD 500–2,500/yr",   note:"Mandatory for study permit." },
        { label:"Medical Examination",        range:"USD 80–200",         note:"Complete before departure." },
        { label:"IELTS / English Test",       range:"USD 200–250",        note:"Required for university and study permit." },
        { label:"Biometrics (if required)",   range:"USD 30–85",          note:"Some destinations require biometrics for permit." },
        { label:"Eammu Consultation",         range:"Free initial",       note:"Full service package available." },
      ],
    };

    case "visa-free": return { ...base,
      heroSubtitle: `${from} citizens enjoy visa-free entry to ${dest} — no travel visa needed, but a Student Permit is still required to study full-time`,
      seoH1: `${from} Student Visa for ${dest} 2026 — Visa-Free Entry Study Permit Guide`,
      introTitle: `Studying in ${dest} as a ${from} Citizen — Visa-Free Entry Advantage`,
      introParas: [
        `${from} passport holders enjoy visa-free access to ${dest} — no embassy appointments, no travel visa fee, no waiting. This is a major advantage that simplifies and accelerates your path to studying abroad.`,
        `However, visa-free travel access does not automatically authorise full-time study. For any course lasting more than a few months, you must obtain a Study Permit or Student Visa through ${dest} immigration — either before departure or after arrival. The good news is this process is faster and cheaper than for students who also need a travel visa.`,
        `Focus your preparation entirely on the study permit application. Eammu Holidays helps ${from} students navigate this efficiently to begin studies on time.`,
      ],
      alertBox: { type:"teal", icon:"🆓", text:`${from} citizens have a significant advantage — no travel visa needed for ${dest}. Save weeks of processing time and hundreds in visa fees. Focus all energy on the study permit application.` },
      quickStats: [
        { icon:"🆓", label:"Travel Visa",     val:"Not Required"     },
        { icon:"📅", label:"Study Permit",    val:"Required"         },
        { icon:"💰", label:"Entry Cost",      val:"No Travel Visa Fee"},
        { icon:"🌐", label:"IELTS Minimum",   val:"6.0–7.0"          },
        { icon:"⚡", label:"Faster Process",  val:"No Embassy Queue"  },
        { icon:"✈️", label:"Post-Study Work", val:"Permit Available" },
      ],
      docs: [
        { icon:"📨", title:"University Acceptance Letter",             required:true,  desc:`Core document for study permit. Original from accredited ${dest} institution stating program, dates, and fees.` },
        { icon:"🎓", title:"Academic Transcripts & Certificates",      required:true,  desc:`All academic records attested and translated into English. No travel visa embassy attestation needed since there's no travel visa requirement.` },
        { icon:"🌐", title:"English Language Score (IELTS/TOEFL/PTE)",required:true,  desc:`Minimum required by institution and ${dest} immigration. Within last 2 years.` },
        { icon:"🛂", title:`Valid ${from} Passport`,                   required:true,  desc:`No visa stamp needed — present at immigration on arrival. Valid for full course plus 6 months.` },
        { icon:"💰", title:"6-Month Bank Statement",                   required:true,  desc:`Consistent balance covering tuition + living costs. Bank stamp on every page. Same financial requirements as visa-required countries — the standard is identical.` },
        { icon:"✍️", title:"Statement of Purpose (SOP)",              required:true,  desc:`Explains academic goals, choice of ${dest}, career plan, and intention to return to ${from}.` },
        { icon:"📸", title:"Passport Photographs",                     required:true,  desc:`Correct dimensions for ${dest} study permit. Typically 45×35mm. White background, within last 6 months.` },
        { icon:"💊", title:"Medical Examination Certificate",          required:true,  desc:`Required for study permits 6+ months. Complete at approved physician in ${from} before departure.` },
        { icon:"🛡️", title:"Student Health Insurance",               required:true,  desc:`Mandatory for study permit. Australia OSHC, UK IHS, Canada provincial/private.` },
        { icon:"🏠", title:"Proof of Accommodation",                  required:true,  desc:`University housing confirmation or private rental agreement for first term.` },
      ],
      steps: [
        { num:"01", icon:"🌟", title:"Take Advantage — No Travel Visa Needed",  time:"Immediately",       body:`As a ${from} citizen, you skip the travel visa step entirely. Start your university application and study permit preparation now — you are already ahead of applicants from visa-required countries.` },
        { num:"02", icon:"🎯", title:"Select Accredited University",            time:"1–3 months",        body:`Verify on official approved list (DLI/CRICOS/Tier 4). You can even visit ${dest} for a campus tour before committing — a major benefit of visa-free access.` },
        { num:"03", icon:"🌐", title:"Complete English Language Test",          time:"2–3 months ahead",  body:`Sit IELTS/TOEFL/PTE. The absence of a travel visa process means you can dedicate more time and budget to the English test preparation.` },
        { num:"04", icon:"📝", title:"Apply to University & Get Offer",        time:"Apply early",       body:`Submit application. Pay deposit on acceptance.` },
        { num:"05", icon:"📁", title:"Apply for Study Permit",                 time:"3 months ahead",    body:`Some countries allow applying before departure — this is often the best approach. Eammu Holidays advises the correct sequence for your specific destination.` },
        { num:"06", icon:"💊", title:"Complete Medical Examination",           time:"Before departure",  body:`Get this done in ${from} before leaving — avoids significant delay after arrival in ${dest}.` },
        { num:"07", icon:"✈️", title:"Travel to ${dest} — Entry Without Visa", time:"Day of travel",    body:`Book and fly freely. At immigration, state purpose. Carry university letter and study permit documents.` },
        { num:"08", icon:"🏫", title:"Register with University",               time:"First week",        body:`University international student office assists with study permit application and local registration.` },
        { num:"09", icon:"⏳", title:"Study Permit Processed",                 time:"2–8 weeks",         body:`If applying locally, submit at immigration office. Do NOT formally enrol until permit issued.` },
        { num:"10", icon:"✅", title:"Receive Permit & Begin Studies",         time:"After approval",    body:`Formally enrol. Note expiry date and work hour conditions on permit.` },
      ],
      rejections: [
        { icon:"🎓", title:"Studying Without Study Permit",       desc:"Visa-free access does not authorise study. Enrolling without a permit is still an immigration violation." },
        { icon:"📄", title:"Incomplete Permit Documents",         desc:"Missing medical cert, insufficient financial proof, or incomplete acceptance letter." },
        { icon:"🏫", title:"Non-Approved Institution",            desc:`University not on ${dest}'s approved study permit list — same rules apply regardless of travel visa status.` },
        { icon:"💰", title:"Insufficient Financial Proof",        desc:"Bank balance or consistency doesn't meet the study permit standard — financial requirements are identical to visa-required countries." },
        { icon:"📝", title:"Weak Statement of Purpose",           desc:"No clear academic intent or failure to demonstrate return intention to ${from}." },
        { icon:"🌐", title:"Below-Minimum English Score",         desc:"IELTS or TOEFL below course requirement — same standard regardless of travel visa status." },
      ],
      faqs: [
        { q:`Do ${from} citizens need a study visa for ${dest} if they have visa-free access?`, a:`Visa-free covers entry and short stays only. For full-time study a Study Permit is still required — but the process is faster and cheaper since there is no travel visa requirement.` },
        { q:`Can I enrol in a short course without a study permit?`, a:`Short courses under 6 months may be permitted under visa-free status in some countries. Confirm with ${dest} immigration authority before enrolling.` },
        { q:`How long does the study permit take for ${from} citizens in ${dest}?`, a:`2–8 weeks typically. You save the travel visa processing time — your total timeline is significantly shorter than other nationalities.` },
        { q:`Can I work while studying in ${dest}?`, a:`Work rights depend on the study permit conditions. Most countries allow 20–48 hours per week during term time.` },
        { q:`What is the main financial advantage of visa-free access?`, a:`No travel visa fee (often USD 150–500), no VFS/BLS service charge (USD 30–85), no biometric fee, no embassy appointment wait. Total saving: USD 300–700+ compared to visa-required students.` },
      ],
      checklist: [
        { category:"Before Departure", icon:"🌟", items:["No travel visa needed — skip this step entirely","University acceptance letter (original)","6-month bank statement — stamped every page","English test score report (within 2 years)","SOP — typed and signed","Medical exam completed in home country","Student health insurance arranged","Book flight and accommodation directly"] },
        { category:"On Arrival in ${dest}", icon:"✈️", items:["Present passport at immigration","State study purpose to border officer","Carry university acceptance letter","Note your entry stamp date"] },
        { category:"Study Permit Application", icon:"📁", items:["Apply in first week","Submit at immigration or online portal","Do NOT formally enrol before permit","Track status daily"] },
        { category:"After Permit Issued", icon:"✅", items:["Formally enrol at university","Check work hour allowance","Note permit expiry for renewal","Attend international student orientation"] },
      ],
      costs: [
        { label:"Travel Visa Fee",             range:"FREE",               note:"Visa-free — no travel visa needed. Significant saving over other nationalities." },
        { label:"Study Permit Fee",            range:"Varies by country",  note:"Canada: CAD 150. Australia: AUD 710. Germany: €75. UK: included in IHS." },
        { label:"Student Health Insurance",    range:"USD 300–2,500/yr",   note:"Mandatory for study permit." },
        { label:"Medical Examination",         range:"USD 80–200",         note:"Complete in home country before departure." },
        { label:"IELTS / English Test",        range:"USD 200–250",        note:"Required for university and study permit." },
        { label:"Document Notarisation",       range:"USD 20–60/doc",      note:"Academic records in other languages must be certified." },
        { label:"Total Saving vs Others",      range:"USD 300–700+",       note:"No travel visa fee, no embassy service charge, no biometric fee." },
      ],
    };

    case "no-admission": return { ...base,
      heroSubtitle: `Direct entry to ${dest} is currently restricted for ${from} passport holders — expert guidance on alternative study pathways`,
      seoH1: `${from} Students Wanting to Study in ${dest} 2026 — Alternative Pathways and Expert Guidance`,
      introTitle: `${from} Citizens and ${dest} — Entry Restrictions and Study Alternatives Explained`,
      introParas: [
        `${from} passport holders are currently not admitted entry to ${dest} under standard travel conditions. This applies to tourism, business, and direct student visas. The restriction may be due to diplomatic relations, sanctions, or absence of a bilateral agreement.`,
        `However, this does not mean studying in ${dest} is completely impossible for all ${from} citizens. Exceptions exist for dual nationals, UAE/GCC residents with valid residency, or individuals holding third-country permanent residency. Eammu Holidays assesses each case individually.`,
        `Additionally, ${from} students can pursue equivalent or superior academic qualifications at fully accessible destinations. Canada, UK, Australia, Germany, Malaysia, and Turkey all welcome ${from} applicants with strong university programs in all fields.`,
      ],
      alertBox: { type:"warning", icon:"🚫", text:`Do NOT attempt to travel to ${dest} without expert advice first. Contact Eammu Holidays for a free assessment of your specific situation — dual nationality, UAE residency, and other factors may open pathways you are not aware of.` },
      quickStats: [
        { icon:"🚫", label:"Direct Entry",    val:"Restricted"      },
        { icon:"🔄", label:"Alternatives",    val:"Available"       },
        { icon:"🌍", label:"Third Country",   val:"Option Possible" },
        { icon:"🎓", label:"Study Options",   val:"Consult Eammu"   },
        { icon:"🛂", label:"Dual Nationality",val:"May Be Eligible" },
        { icon:"📞", label:"Free Assessment", val:"WhatsApp Eammu"  },
      ],
      docs: [
        { icon:"🛂", title:"Second Passport / Dual Nationality Check",         required:false, desc:`If you hold citizenship or permanent residency of a third country, you may be eligible to travel to ${dest} on that document. Eammu Holidays verifies eligibility based on your situation.` },
        { icon:"🇦🇪", title:"UAE/GCC Residency Visa (If Applicable)",         required:false, desc:`UAE and certain GCC residents with valid residency may be eligible for entry to ${dest} depending on the specific restriction type. Bring Emirates ID and residence visa for assessment.` },
        { icon:"🌍", title:"Third-Country Residency Documents",                 required:false, desc:`Permanent residency from Canada, UK, EU, or Australia may open alternative pathways. Bring all residency documents for Eammu assessment.` },
        { icon:"📋", title:"University Acceptance (Alternative Destinations)", required:false, desc:`If ${dest} is not accessible, Eammu Holidays helps you apply to equivalent universities in fully accessible countries in the same field.` },
        { icon:"📞", title:"Eammu Holidays Expert Consultation",               required:true,  desc:`Most important step. Contact via WhatsApp or visit offices in Cumilla, Dhaka, Dubai, or Yerevan. We assess your full situation to identify the best legal pathway.` },
      ],
      steps: [
        { num:"01", icon:"📞", title:"Contact Eammu Holidays for Free Assessment", time:"Immediately",  body:`Share your passport, any other nationalities/residencies, desired field of study, and preferred destination. We assess all factors for any applicable exception pathway.` },
        { num:"02", icon:"🔍", title:"Verify if Any Exception Applies",            time:"1–3 days",    body:`Exceptions that may allow ${from} citizens to study in ${dest}: dual nationality, UAE/GCC residency, Canadian/UK/EU/Australian permanent residency, or specific diplomatic exemptions.` },
        { num:"03", icon:"🌍", title:"Explore Alternative Study Destinations",     time:"Ongoing",     body:`Eammu identifies equivalent universities in Canada, UK, Australia, Germany, Malaysia, Turkey, or other fully accessible countries matching your academic profile.` },
        { num:"04", icon:"🎓", title:"Apply to Alternative Universities",           time:"Start early", body:`We shortlist accredited universities in accessible countries. Many offer identical programs to ${dest} institutions, often with scholarships for ${from} students.` },
        { num:"05", icon:"✅", title:"Full Student Visa Application Support",       time:"Per destination",body:`End-to-end support for your student visa to the chosen alternative destination — SOP writing, document preparation, embassy submission.` },
      ],
      rejections: [
        { icon:"🚫", title:"Attempting Entry Without Expert Guidance",         desc:`Attempting to enter ${dest} with a restricted passport can result in detention and permanent future entry bans.` },
        { icon:"🔍", title:"Assuming Third-Country Residency Is Sufficient",   desc:`Not all third-country residencies are accepted. Specific rules apply — always verify with Eammu Holidays before travelling.` },
        { icon:"📋", title:"Student Visa Without Checking Entry Status",       desc:`A university offer letter does not override entry restrictions. Entry and visa status are assessed separately at the border.` },
      ],
      faqs: [
        { q:`Can ${from} citizens ever study in ${dest}?`, a:`In some cases yes — through dual nationality, UAE/GCC/third-country residency, or specific exceptions. Contact Eammu Holidays for an individual assessment.` },
        { q:`Are there good alternative study destinations for ${from} students?`, a:`Yes — Canada, UK, Australia, Germany, Malaysia, Turkey offer excellent universities fully accessible to ${from} passport holders. Eammu specialises in university matching for ${from} students.` },
        { q:`I have UAE residency — can I study in ${dest}?`, a:`UAE residence may open additional entry pathways in some cases. This depends on the specific restriction. Eammu Holidays will assess your case.` },
        { q:`What should ${from} students do if ${dest} is their dream destination?`, a:`Consult Eammu Holidays immediately. Many students complete equivalent degrees in Canada or the UK with superior post-study work rights.` },
        { q:`Can entry restrictions change over time?`, a:`Yes — diplomatic relations evolve. Eammu monitors changes and will notify you if restrictions are lifted or modified.` },
      ],
      checklist: [
        { category:"Immediate Steps", icon:"📞", items:["Contact Eammu Holidays via WhatsApp","List all nationalities and residencies you hold","Note desired field of study and budget","Do not book any flights to ${dest} yet"] },
        { category:"Alternative Pathway Assessment", icon:"🌍", items:["Share all passport and residency docs with Eammu team","Identify 2–3 alternative study destinations","Research equivalent programs in accessible countries","Check scholarship availability for ${from} students"] },
        { category:"Application (Alternative Destination)", icon:"🎓", items:["Receive university shortlist from Eammu Holidays","Sit IELTS/TOEFL as required","Prepare academic transcripts (attested)","Begin university application with Eammu guidance"] },
      ],
      costs: [
        { label:"Eammu Consultation",          range:"Free",             note:"Free initial assessment of eligibility and alternatives." },
        { label:"Alternative Destination Visa",range:"Varies",          note:"Depends on which country you study in — Eammu advises exact costs." },
        { label:"University Application Fees", range:"USD 50–200",      note:"Per university in the alternative destination." },
        { label:"IELTS / English Test",        range:"USD 200–250",     note:"Required for most alternative destinations." },
        { label:"Scholarship Research",        range:"Free with Eammu", note:"We identify scholarships for ${from} students in alternative countries." },
      ],
    };

    default: return getStatusContent("visa-required", dest, from);
  }
}

export default function StudentVisaGuideClient({ slug, statusSlug, passportName, destinationName }) {
  const [passportData, setPassportData] = useState(null);
  const [activeTab,    setActiveTab]    = useState("overview");

  const meta    = STATUS_META[statusSlug] || STATUS_META["visa-required"];
  const dest    = destinationName || "your destination";
  const from    = passportName    || "your country";
  const content = getStatusContent(statusSlug, dest, from);

  useEffect(() => {
    if (!passportName || !destinationName) return;
    fetch(`${BASE}/passport?from=${encodeURIComponent(passportName)}&to=${encodeURIComponent(destinationName)}&api_key=${API_KEY}`)
      .then(async r => { if (!r.ok) throw new Error(); const d = await r.json(); if (d.from || d.to) setPassportData(d); })
      .catch(() => {});
  }, [passportName, destinationName]);

  const tabs = [
    { id:"overview",  label:"Overview",      icon:"📌" },
    { id:"documents", label:"Documents",     icon:"📁" },
    { id:"process",   label:"How to Apply",  icon:"🗺️" },
    { id:"costs",     label:"Costs & Fees",  icon:"💰" },
    { id:"checklist", label:"Checklist",     icon:"✅" },
    { id:"rejection", label:"Avoid Refusal", icon:"🚫" },
    { id:"faq",       label:"FAQ",           icon:"❓" },
  ];

  const alertColors = {
    warning:{ bg:"#fffbeb", border:"#fde68a", text:"#92400e" },
    info:   { bg:"#eff6ff", border:"#bfdbfe", text:"#1e40af" },
    success:{ bg:"#ecfdf5", border:"#a7f3d0", text:"#065f46" },
    purple: { bg:"#f5f3ff", border:"#ddd6fe", text:"#5b21b6" },
    teal:   { bg:"#ecfeff", border:"#a5f3fc", text:"#0e7490" },
  };
  const ac = alertColors[content.alertBox?.type] || alertColors.warning;

  const scrollTo = (id) => {
    const el = document.getElementById(`sec-${id}`);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior:"smooth" });
  };

  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc", paddingBottom:80 }}>

      {/* HERO */}
      <div style={{ background:`linear-gradient(135deg,${meta.color} 0%,${meta.color}cc 100%)`, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"-80px", right:"-80px", width:400, height:400, borderRadius:"50%", background:"rgba(255,255,255,0.07)", filter:"blur(80px)", pointerEvents:"none" }} />
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"80px 20px 52px", position:"relative", zIndex:1 }}>

          {/* Breadcrumb */}
          <nav style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:"rgba(255,255,255,0.6)", marginBottom:24, flexWrap:"wrap" }}>
            <Link href="/student-visa" style={{ color:"rgba(255,255,255,0.6)", textDecoration:"none" }}>Student Visa</Link>
            <span>/</span>
            <Link href={`/student-visa/${slug}`} style={{ color:"rgba(255,255,255,0.6)", textDecoration:"none" }}>
              {passportName}{destinationName ? ` → ${destinationName}` : ""}
            </Link>
            <span>/</span>
            <span style={{ color:"rgba(255,255,255,0.9)" }}>{meta.label}</span>
          </nav>

          <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:32, alignItems:"center" }}>
            <div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"5px 14px", background:"rgba(255,255,255,0.15)", borderRadius:999, border:"1px solid rgba(255,255,255,0.25)", marginBottom:16 }}>
                <span>{meta.icon}</span>
                <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase", color:"#fff" }}>{meta.label} · Eammu Holidays 2026</span>
              </div>
              <h1 style={{ fontSize:"clamp(18px,3vw,38px)", fontWeight:900, color:"#fff", margin:"0 0 10px", lineHeight:1.08 }}>
                {content.seoH1}
              </h1>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.72)", lineHeight:1.7, maxWidth:620, margin:"0 0 22px" }}>
                {content.heroSubtitle}
              </p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {["Embassy Verified","2026 Updated","Expert Reviewed","IATA Accredited"].map(b => (
                  <span key={b} style={{ padding:"4px 12px", background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:999, fontSize:9, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.1em", color:"#fff" }}>{b}</span>
                ))}
              </div>
            </div>
            {passportData && (
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                {passportData.from?.passport_cover && (
                  <img src={passportData.from.passport_cover} alt={from}
                    style={{ width:68, height:96, objectFit:"cover", borderRadius:12, boxShadow:"0 8px 32px rgba(0,0,0,0.3)", border:"3px solid rgba(255,255,255,0.25)" }} />
                )}
                <span style={{ fontSize:22, color:"rgba(255,255,255,0.5)" }}>✈</span>
                {passportData.to?.passport_cover && (
                  <img src={passportData.to.passport_cover} alt={dest}
                    style={{ width:68, height:96, objectFit:"cover", borderRadius:12, boxShadow:"0 8px 32px rgba(0,0,0,0.3)", border:"3px solid rgba(255,255,255,0.25)" }} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TAB NAV */}
      <div style={{ position:"sticky", top:0, zIndex:30, background:"rgba(255,255,255,0.97)", backdropFilter:"blur(12px)", borderBottom:"1px solid #e2e8f0", boxShadow:"0 1px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", gap:4, overflowX:"auto", padding:"8px 20px" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => { setActiveTab(t.id); scrollTo(t.id); }}
              style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 14px", borderRadius:10, fontSize:11, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.06em", whiteSpace:"nowrap", cursor:"pointer", border:"none", transition:"all 0.15s", background:activeTab===t.id ? meta.color : "transparent", color:activeTab===t.id ? "#fff" : "#64748b" }}>
              <span>{t.icon}</span><span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* MAIN GRID */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px 20px", display:"grid", gridTemplateColumns:"1fr 340px", gap:28 }}>

        {/* LEFT CONTENT */}
        <div style={{ display:"grid", gap:20 }}>

          {/* OVERVIEW */}
          <section id="sec-overview" style={{ background:"#fff", borderRadius:20, border:"1px solid #e2e8f0", padding:28 }}>
            <h2 style={{ fontSize:18, fontWeight:800, color:"#0f172a", margin:"0 0 14px" }}>{content.introTitle}</h2>
            <div style={{ display:"grid", gap:12, marginBottom:18 }}>
              {content.introParas.map((p,i) => (
                <p key={i} style={{ fontSize:13, color:"#475569", lineHeight:1.8, margin:0 }}>{p}</p>
              ))}
            </div>
            {content.alertBox && (
              <div style={{ padding:"12px 16px", background:ac.bg, border:`1px solid ${ac.border}`, borderRadius:12, fontSize:13, color:ac.text, lineHeight:1.65, marginBottom:20 }}>
                <strong>{content.alertBox.icon}</strong> {content.alertBox.text}
              </div>
            )}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:10 }}>
              {content.quickStats.map((s,i) => (
                <div key={i} style={{ background:"#f8fafc", borderRadius:12, padding:"12px", textAlign:"center", border:"1px solid #e2e8f0" }}>
                  <span style={{ fontSize:18, display:"block", marginBottom:4 }}>{s.icon}</span>
                  <p style={{ fontSize:9, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.1em", color:meta.color, margin:"0 0 2px" }}>{s.label}</p>
                  <p style={{ fontSize:11, fontWeight:800, color:"#0f172a", margin:0, lineHeight:1.3 }}>{s.val}</p>
                </div>
              ))}
            </div>
          </section>

          {/* DOCUMENTS */}
          {content.docs?.length > 0 && (
            <section id="sec-documents" style={{ background:"#fff", borderRadius:20, border:"1px solid #e2e8f0", padding:28 }}>
              <h2 style={{ fontSize:18, fontWeight:800, color:"#0f172a", margin:"0 0 6px" }}>
                {dest} Student Visa Documents for {from} Citizens
              </h2>
              <p style={{ fontSize:12, color:"#64748b", margin:"0 0 20px" }}>
                Prepare every document carefully — missing one item causes rejection without fee refund.
              </p>
              <div style={{ display:"grid", gap:10 }}>
                {content.docs.map((doc,i) => (
                  <div key={i} style={{ display:"flex", gap:14, padding:"14px 16px", borderRadius:14, border:"1px solid #f1f5f9", background:"#fafafa" }}>
                    <span style={{ fontSize:22, flexShrink:0 }}>{doc.icon}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4, flexWrap:"wrap" }}>
                        <p style={{ fontSize:13, fontWeight:700, color:"#0f172a", margin:0 }}>{doc.title}</p>
                        <span style={{ fontSize:9, fontWeight:800, padding:"2px 8px", borderRadius:999, background:doc.required ? "#fef2f2" : "#f1f5f9", color:doc.required ? "#dc2626" : "#64748b" }}>
                          {doc.required ? "REQUIRED" : "CONDITIONAL"}
                        </span>
                      </div>
                      <p style={{ fontSize:12, color:"#64748b", margin:0, lineHeight:1.6 }}>{doc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* PROCESS */}
          {content.steps?.length > 0 && (
            <section id="sec-process" style={{ background:"#fff", borderRadius:20, border:"1px solid #e2e8f0", padding:28 }}>
              <h2 style={{ fontSize:18, fontWeight:800, color:"#0f172a", margin:"0 0 6px" }}>
                How to Apply — {dest} Student Visa for {from} Citizens Step by Step
              </h2>
              <p style={{ fontSize:12, color:"#64748b", margin:"0 0 24px" }}>Follow every step in order for the best chance of approval.</p>
              <ol style={{ listStyle:"none", padding:0, margin:0, display:"grid", gap:0 }}>
                {content.steps.map((s,i) => (
                  <li key={i} style={{ display:"flex", gap:16, paddingBottom:i < content.steps.length-1 ? 24 : 0, position:"relative" }}>
                    {i < content.steps.length-1 && (
                      <div style={{ position:"absolute", left:19, top:44, bottom:0, width:2, background:"linear-gradient(to bottom,#e2e8f0,transparent)" }} />
                    )}
                    <div style={{ width:40, height:40, borderRadius:12, background:`${meta.color}12`, border:`2px solid ${meta.color}22`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:18 }}>
                      {s.icon}
                    </div>
                    <div style={{ flex:1, paddingTop:6 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4, flexWrap:"wrap" }}>
                        <span style={{ fontSize:9, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.1em", color:meta.color }}>Step {s.num}</span>
                        {s.time && (
                          <span style={{ fontSize:9, fontWeight:700, padding:"2px 8px", borderRadius:999, background:"#f8fafc", border:"1px solid #e2e8f0", color:"#64748b" }}>⏱ {s.time}</span>
                        )}
                      </div>
                      <p style={{ fontSize:13, fontWeight:800, color:"#0f172a", margin:"0 0 4px" }}>{s.title}</p>
                      <p style={{ fontSize:12, color:"#64748b", margin:0, lineHeight:1.65 }}>{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* COSTS */}
          {content.costs?.length > 0 && (
            <section id="sec-costs" style={{ background:"#fff", borderRadius:20, border:"1px solid #e2e8f0", padding:28 }}>
              <h2 style={{ fontSize:18, fontWeight:800, color:"#0f172a", margin:"0 0 6px" }}>
                {dest} Student Visa Cost Breakdown for {from} Citizens 2026
              </h2>
              <p style={{ fontSize:12, color:"#64748b", margin:"0 0 20px" }}>Budget for all components before starting your application.</p>
              <div style={{ display:"grid", gap:10 }}>
                {content.costs.map((c,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:14, padding:"14px 16px", borderRadius:14, border:"1px solid #f1f5f9", background:"#fafafa" }}>
                    <div style={{ flex:1 }}>
                      <p style={{ fontSize:13, fontWeight:700, color:"#0f172a", margin:"0 0 3px" }}>{c.label}</p>
                      <p style={{ fontSize:11, color:"#64748b", margin:0 }}>{c.note}</p>
                    </div>
                    <span style={{ fontSize:11, fontWeight:800, padding:"4px 12px", borderRadius:999, background:`${meta.color}12`, color:meta.color, whiteSpace:"nowrap", flexShrink:0 }}>{c.range}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:14, padding:"12px 16px", background:"#fffbeb", border:"1px solid #fde68a", borderRadius:12, fontSize:12, color:"#92400e" }}>
                ⚠️ All visa and permit fees are non-refundable. Only book non-refundable travel after your permit is approved.
              </div>
            </section>
          )}

          {/* CHECKLIST */}
          {content.checklist?.length > 0 && (
            <section id="sec-checklist" style={{ background:"#fff", borderRadius:20, border:"1px solid #e2e8f0", padding:28 }}>
              <h2 style={{ fontSize:18, fontWeight:800, color:"#0f172a", margin:"0 0 6px" }}>
                {dest} Student Visa Checklist — {from} Citizens ({meta.label})
              </h2>
              <p style={{ fontSize:12, color:"#64748b", margin:"0 0 20px" }}>Track every stage from application to arrival.</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                {content.checklist.map((section,si) => (
                  <div key={si} style={{ borderRadius:14, border:"1px solid #e2e8f0", overflow:"hidden" }}>
                    <div style={{ padding:"12px 16px", background:`${meta.color}10`, borderBottom:"1px solid #e2e8f0", display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontSize:16 }}>{section.icon}</span>
                      <p style={{ fontSize:10, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.1em", color:meta.color, margin:0 }}>{section.category}</p>
                    </div>
                    <div style={{ padding:"14px 16px", display:"grid", gap:8 }}>
                      {section.items.map((item,ii) => (
                        <label key={ii} style={{ display:"flex", alignItems:"flex-start", gap:8, cursor:"pointer" }}>
                          <div style={{ width:14, height:14, borderRadius:4, border:"2px solid #cbd5e1", flexShrink:0, marginTop:2 }} />
                          <span style={{ fontSize:11, color:"#475569", lineHeight:1.5 }}>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* REJECTIONS */}
          {content.rejections?.length > 0 && (
            <section id="sec-rejection" style={{ background:"#fff", borderRadius:20, border:"1px solid #e2e8f0", padding:28 }}>
              <h2 style={{ fontSize:18, fontWeight:800, color:"#0f172a", margin:"0 0 6px" }}>
                Why {dest} Student Visa Applications Get Rejected — {from} Applicants
              </h2>
              <p style={{ fontSize:12, color:"#64748b", margin:"0 0 20px" }}>Avoid these mistakes to maximise your approval chances.</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                {content.rejections.map((r,i) => (
                  <div key={i} style={{ display:"flex", gap:12, padding:"14px 16px", background:"#fef2f2", border:"1px solid #fecaca", borderRadius:14 }}>
                    <span style={{ fontSize:22, flexShrink:0 }}>{r.icon}</span>
                    <div>
                      <p style={{ fontSize:12, fontWeight:800, color:"#991b1b", margin:"0 0 3px" }}>{r.title}</p>
                      <p style={{ fontSize:11, color:"#b91c1c", margin:0, lineHeight:1.5 }}>{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQs */}
          {content.faqs?.length > 0 && (
            <section id="sec-faq" style={{ background:"#fff", borderRadius:20, border:"1px solid #e2e8f0", padding:28 }}>
              <h2 style={{ fontSize:18, fontWeight:800, color:"#0f172a", margin:"0 0 20px" }}>
                {dest} Student Visa FAQ for {from} Citizens 2026 — {meta.label}
              </h2>
              {content.faqs.map((f,i) => <FaqItem key={i} q={f.q} a={f.a} color={meta.color} />)}
            </section>
          )}

        </div>

        {/* SIDEBAR */}
        <aside style={{ display:"grid", gap:16, alignContent:"start" }}>

          {/* CTA Card */}
          <div style={{ background:"linear-gradient(155deg,#0f172a,#1e293b)", borderRadius:20, overflow:"hidden" }}>
            <div style={{ height:3, background:`linear-gradient(90deg,${meta.color},${meta.color}88)` }} />
            <div style={{ padding:24, position:"relative" }}>
              <div style={{ position:"absolute", top:0, right:0, width:160, height:160, borderRadius:"50%", background:`${meta.color}15`, filter:"blur(40px)", pointerEvents:"none" }} />
              <h3 style={{ fontSize:16, fontWeight:900, color:"#fff", margin:"0 0 8px", position:"relative" }}>
                {statusSlug === "no-admission" ? "Get Expert Advice" : `Apply for ${dest} Student Visa`}
              </h3>
              <p style={{ fontSize:12, color:"#94a3b8", lineHeight:1.65, margin:"0 0 16px", position:"relative" }}>
                {statusSlug === "no-admission"
                  ? `Entry to ${dest} is restricted. Contact Eammu Holidays for a free assessment of alternative study pathways.`
                  : `Expert support from Eammu Holidays — IATA accredited. Offices in Cumilla, Dhaka, Dubai, and Yerevan.`}
              </p>

              {/* Passport flags */}
              {passportData && (
                <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 12px", background:"rgba(255,255,255,0.06)", borderRadius:10, marginBottom:16, border:"1px solid rgba(255,255,255,0.08)" }}>
                  {passportData.from?.flag && <img src={passportData.from.flag} alt="" style={{ width:24, height:16, objectFit:"cover", borderRadius:3 }} />}
                  <span style={{ fontSize:11, color:"#94a3b8" }}>{from}</span>
                  <span style={{ color:"#475569" }}>→</span>
                  {passportData.to?.flag && <img src={passportData.to.flag} alt="" style={{ width:24, height:16, objectFit:"cover", borderRadius:3 }} />}
                  <span style={{ fontSize:11, color:"#fff", fontWeight:700 }}>{dest}</span>
                </div>
              )}

              {/* Services */}
              <div style={{ display:"grid", gap:8, marginBottom:18 }}>
                {(statusSlug === "no-admission"
                  ? [["🔍","Free eligibility assessment"],["🌍","Alternative destination guidance"],["🎓","University matching service"],["📞","24/7 WhatsApp support"]]
                  : [["🎓","University selection & shortlisting"],["📋","Document prep & SOP writing"],["🏛️","Embassy submission & tracking"],["✈️","Pre-departure support"]]
                ).map(([icon,text]) => (
                  <div key={text} style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:16 }}>{icon}</span>
                    <span style={{ fontSize:12, color:"#94a3b8" }}>{text}</span>
                  </div>
                ))}
              </div>

              <a href={`https://wa.me/8801631312524?text=${encodeURIComponent(`Hello, I am a ${from} citizen and need help with a student visa for ${dest} — ${meta.label}.`)}`}
                target="_blank" rel="noopener noreferrer"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:"100%", padding:"14px 0", background:"#10b981", color:"#fff", borderRadius:12, fontWeight:700, fontSize:13, textDecoration:"none" }}>
                💬 {statusSlug === "no-admission" ? "Get Free Assessment" : "Apply via WhatsApp"}
              </a>
              <p style={{ fontSize:9, textAlign:"center", color:"#475569", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", marginTop:10, marginBottom:0 }}>
                Free consultation · No upfront fees
              </p>
            </div>
          </div>

          {/* Quick Reference */}
          <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:16, padding:20 }}>
            <p style={{ fontSize:9, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.12em", color:"#94a3b8", margin:"0 0 14px" }}>Quick Reference — {meta.label}</p>
            {content.quickStats.map((s,i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:i < content.quickStats.length-1 ? "1px solid #f8fafc" : "none" }}>
                <span style={{ fontSize:11, color:"#64748b" }}>{s.icon} {s.label}</span>
                <span style={{ fontSize:11, fontWeight:800, color:"#0f172a" }}>{s.val}</span>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:16, padding:20 }}>
            <p style={{ fontSize:9, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.12em", color:"#94a3b8", margin:"0 0 12px" }}>Navigation</p>
            <div style={{ display:"grid", gap:8 }}>
              <Link href="/student-visa" style={{ display:"block", padding:"10px 14px", borderRadius:10, border:"1px solid #e2e8f0", fontSize:12, color:"#334155", textDecoration:"none", fontWeight:600 }}>
                ← Student Visa Checker
              </Link>
              <Link href={`/student-visa/${slug}`} style={{ display:"block", padding:"10px 14px", borderRadius:10, border:"1px solid #e2e8f0", fontSize:12, color:"#334155", textDecoration:"none", fontWeight:600 }}>
                ← {passportName}{destinationName ? ` → ${destinationName}` : ""}
              </Link>
              <Link href="/visa-checker" style={{ display:"block", padding:"10px 14px", borderRadius:10, border:"1px solid #e2e8f0", fontSize:12, color:"#334155", textDecoration:"none", fontWeight:600 }}>
                🔍 General Visa Checker
              </Link>
            </div>
          </div>

          {/* Other statuses */}
          {destinationName && (
            <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:16, padding:20 }}>
              <p style={{ fontSize:9, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.12em", color:"#94a3b8", margin:"0 0 12px" }}>Other Visa Types for {dest}</p>
              <div style={{ display:"grid", gap:6 }}>
                {Object.entries(STATUS_META).filter(([s]) => s !== statusSlug).map(([s,m]) => (
                  <Link key={s} href={`/student-visa/${slug}/${s}`}
                    style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 12px", borderRadius:10, border:`1px solid ${m.color}22`, background:m.light, textDecoration:"none", fontSize:11, fontWeight:700, color:m.color }}>
                    <span>{m.icon}</span>{m.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

        </aside>
      </div>

      {/* BOTTOM CTA */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 20px" }}>
        <div style={{ background:"linear-gradient(135deg,#0f172a,#1e293b)", borderRadius:20, padding:"48px 40px", textAlign:"center" }}>
          <h2 style={{ fontSize:24, fontWeight:900, color:"#fff", margin:"0 0 10px" }}>
            {statusSlug === "no-admission"
              ? `Need Help Finding an Alternative to ${dest}?`
              : `Ready to Start Your ${dest} Study Journey?`}
          </h2>
          <p style={{ fontSize:14, color:"#64748b", margin:"0 0 28px", maxWidth:480, marginLeft:"auto", marginRight:"auto" }}>
            {statusSlug === "no-admission"
              ? `Eammu Holidays helps ${from} students find the best alternative study destinations with equivalent universities and full visa support.`
              : `Eammu Holidays handles everything — from university selection to visa approval. IATA-accredited. Offices in Bangladesh, UAE, and Armenia.`}
          </p>
          <a href={`https://wa.me/8801631312524?text=${encodeURIComponent(`Hello, I need student visa guidance for ${dest} (${meta.label}) as a ${from} citizen.`)}`}
            target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"16px 36px", background:"#10b981", color:"#fff", borderRadius:14, fontWeight:800, fontSize:14, textDecoration:"none" }}>
            💬 Start Free Consultation →
          </a>
        </div>
      </div>

    </div>
  );
}

function FaqItem({ q, a, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderRadius:14, border:`2px solid ${open ? "#e2e8f0" : "#f1f5f9"}`, overflow:"hidden", marginBottom:8, transition:"border-color 0.15s" }}>
      <button onClick={() => setOpen(v => !v)}
        style={{ width:"100%", padding:"14px 18px", background:"none", border:"none", textAlign:"left", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", gap:12 }}>
        <span style={{ fontSize:13, fontWeight:700, color:"#0f172a", lineHeight:1.45 }}>{q}</span>
        <div style={{ width:26, height:26, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", background:open ? color : "#f1f5f9", color:open ? "#fff" : "#64748b", flexShrink:0, transition:"all 0.2s" }}>
          <span style={{ transform:open ? "rotate(180deg)" : "none", transition:"transform 0.2s", display:"block", fontSize:12 }}>▾</span>
        </div>
      </button>
      {open && (
        <div style={{ padding:"0 18px 14px", fontSize:13, color:"#475569", lineHeight:1.7, borderTop:"1px solid #f1f5f9" }}>{a}</div>
      )}
    </div>
  );
}