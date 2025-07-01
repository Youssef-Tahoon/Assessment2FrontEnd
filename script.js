// Data storage
let userData = {}

// Page navigation
function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active")
  })
  document.getElementById(pageId).classList.add("active")
}

// Phone number validation and form handling
document.getElementById("phoneForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const phoneNumber = document.getElementById("phoneNumber").value
  const phoneError = document.getElementById("phoneError")

  // Only allow specific phone number
  if (phoneNumber === "173527250") {
    userData.phone = "+60" + phoneNumber
    phoneError.style.display = "none"
    showPage("page2")
  } else {
    phoneError.style.display = "block"
  }
})

// Phone input - only allow numbers
document.getElementById("phoneNumber").addEventListener("input", function (e) {
  this.value = this.value.replace(/[^0-9]/g, "")
})

// Registration form handling
document.getElementById("registrationForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const name = document.getElementById("userName").value.trim()
  const day = document.getElementById("day").value
  const month = document.getElementById("month").value
  const year = document.getElementById("year").value
  const email = document.getElementById("userEmail").value.trim()
  const noEmail = document.getElementById("noEmail").checked

  let isValid = true

  // Name validation
  if (!name) {
    document.getElementById("nameError").style.display = "block"
    isValid = false
  } else {
    document.getElementById("nameError").style.display = "none"
  }

  // Birthday validation
  if (!day || !month || !year) {
    document.getElementById("birthdayError").style.display = "block"
    isValid = false
  } else {
    document.getElementById("birthdayError").style.display = "none"
  }

  // Email validation
  if (!noEmail && (!email || !isValidEmail(email))) {
    document.getElementById("emailError").style.display = "block"
    isValid = false
  } else {
    document.getElementById("emailError").style.display = "none"
  }

  if (isValid) {
    userData.name = name
    userData.birthday = `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`
    userData.email = noEmail ? "No email provided" : email

    displayUserData()
    showPage("page3")
  }
})

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// No email checkbox handling
document
  .getElementById("noEmail")
  .addEventListener("change", function () {
    const emailInput = document.getElementById("userEmail")
    if (this.checked) {
      emailInput.disabled = true
      emailInput.value = ""
      emailInput.style.opacity = "0.5"
    } else {
      emailInput.disabled = false
      emailInput.style.opacity = "1"
    }
  })

// Birthday input validation
;["day", "month", "year"].forEach((id) => {
  document.getElementById(id).addEventListener("input", function () {
    if (id === "day" && this.value > 31) this.value = 31
    if (id === "month" && this.value > 12) this.value = 12
    if (id === "year" && this.value > 2024) this.value = 2024
    if (this.value < 0) this.value = ""
  })
})

// Display user data on page 3
function displayUserData() {
  document.getElementById("displayPhone").textContent = userData.phone
  document.getElementById("displayName").textContent = userData.name
  document.getElementById("displayEmail").textContent = userData.email
  document.getElementById("displayBirthday").textContent = userData.birthday
}

// Reset form function
function resetForm() {
  userData = {}
  document.getElementById("phoneForm").reset()
  document.getElementById("registrationForm").reset()
  document.getElementById("userEmail").disabled = false
  document.getElementById("userEmail").style.opacity = "1"
  document.querySelectorAll(".error-message").forEach((error) => {
    error.style.display = "none"
  })
  showPage("page1")
}
