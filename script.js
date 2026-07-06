// ╔══════════════════════════════════════╗
// ║  YAHAN APNI DETAILS UPDATE KARO     ║
// ╚══════════════════════════════════════╝

const WHATSAPP_NUMBER = "91XXXXXXXXXX";       // Apna WhatsApp number likho (91 ke saath)
const RAZORPAY_KEY    = "rzp_test_XXXXXXXX";  // Apni Razorpay Key likho

// ── Temporary storage ──
let currentOrder = {
  template: "",
  amount: 0,
  paymentId: ""
};

// ── WhatsApp link helper ──
function waLink(msg) {
  const num = WHATSAPP_NUMBER.replace(/\D/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
}

// ── Setup WhatsApp links ──
function setupWA() {
  document.getElementById("waContact").href =
    waLink("Hello Digital Studio, mujhe birthday template ke baare me jankari chahiye.");
  document.getElementById("waFloat").href =
    waLink("Hello Digital Studio");
}

// ── Open Modal ──
function openModal() {
  document.getElementById("detailsModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

// ── Close Modal ──
function closeModal() {
  document.getElementById("detailsModal").classList.remove("active");
  document.body.style.overflow = "";
}

// ── Razorpay Payment ──
function payNow(templateName, price) {
  if (RAZORPAY_KEY.includes("XXXX") || WHATSAPP_NUMBER.includes("XXXX")) {
    alert("⚠️ Pehle Razorpay Key aur WhatsApp Number update karo code mein.");
    return;
  }

  const options = {
    key: RAZORPAY_KEY,
    amount: price * 100,
    currency: "INR",
    name: "Digital Studio",
    description: templateName + " Purchase",
    image: "logo.svg",
    handler: function(response) {
      // Save order info
      currentOrder.template  = templateName;
      currentOrder.amount    = price;
      currentOrder.paymentId = response.razorpay_payment_id;

      // Update modal with order info
      document.getElementById("modalTemplate").textContent  = templateName;
      document.getElementById("modalAmount").textContent     = "₹" + price;
      document.getElementById("modalPaymentId").textContent  = response.razorpay_payment_id;

      // Open details form modal
      openModal();
    },
    theme: { color: "#8b5cf6" }
  };

  const rzp = new Razorpay(options);
  rzp.open();
}

// ── Submit Details Form → WhatsApp Message ──
function submitDetails(e) {
  e.preventDefault();

  const name         = document.getElementById("formName").value.trim();
  const phone        = document.getElementById("formPhone").value.trim();
  const bdayName     = document.getElementById("formBirthdayName").value.trim();
  const bdayDate     = document.getElementById("formBirthdayDate").value;
  const relation     = document.getElementById("formRelation").value;
  const message      = document.getElementById("formMessage").value.trim();
  const photoLink    = document.getElementById("formPhotoLink").value.trim();
  const song         = document.getElementById("formSong").value.trim();
  const instructions = document.getElementById("formInstructions").value.trim();

  // Validation
  if (!name || !phone || !bdayName || !bdayDate || !message) {
    alert("Please sabhi required fields bharein.");
    return;
  }

  // Build WhatsApp message
  const waMsg =
`🎂 *NEW ORDER — Digital Studio*
━━━━━━━━━━━━━━━━━━━━

📦 *ORDER DETAILS*
• Template: ${currentOrder.template}
• Amount Paid: ₹${currentOrder.amount}
• Payment ID: ${currentOrder.paymentId}

👤 *CUSTOMER DETAILS*
• Name: ${name}
• WhatsApp: ${phone}

🎈 *BIRTHDAY DETAILS*
• Birthday Person: ${bdayName}
• Date: ${bdayDate}
• Relation: ${relation || "Not specified"}

💌 *BIRTHDAY MESSAGE*
${message}

📸 *PHOTO LINK*
${photoLink || "WhatsApp par bhejenge"}

🎵 *SONG / MUSIC*
${song || "Not specified"}

📝 *SPECIAL INSTRUCTIONS*
${instructions || "None"}

━━━━━━━━━━━━━━━━━━━━
Please meri website jaldi bana dijiye! 🙏`;

  // Open WhatsApp with full message
  window.open(waLink(waMsg), "_blank");

  // Close modal & reset form
  closeModal();
  document.getElementById("detailsForm").reset();

  // Thank you alert
  setTimeout(() => {
    alert("✅ Details successfully send ho gayi hain!\n\nHum 24 ghante mein aapki website ka link WhatsApp par bhej denge.");
  }, 1000);
}

// ── Initialize ──
setupWA();

const whatsappNumber = "917987020933";

const whatsappMessage =
  "Hello! Mujhe Birthday Website ke baare me info chahiye.";

const whatsappURL =
  "https://wa.me/" +
  whatsappNumber +
  "?text=" +
  encodeURIComponent(whatsappMessage);

document.getElementById("waContact").setAttribute("href", whatsappURL);

document.getElementById("waFloat").setAttribute("href", whatsappURL);