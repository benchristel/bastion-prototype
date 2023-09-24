customElements.define("x-search", class extends HTMLElement {
  connectedCallback() {
    this.pattern = this.getAttribute("pattern")

    this.attachShadow({mode: "open"})
    const wrapper = document.createElement("span")
    this.input = this.createInput()
    wrapper.append(
      this.input,
      this.createSpacer(),
      this.createSubmitButton(),
    )

    this.shadowRoot.append(this.createStyle(), wrapper)
  }

  createInput() {
    const input = document.createElement("input")
    input.setAttribute("placeholder", this.getAttribute("placeholder"))
    input.addEventListener("keypress", (event) =>
      event.key === "Enter" && this.submit())
    return input
  }

  createSpacer() {
    const spacer = document.createElement("span")
    spacer.className = "spacer"
    return spacer
  }

  createSubmitButton() {
    const button = document.createElement("button")
    button.innerText = "Go"
    button.addEventListener("click", () => this.submit())
    return button
  }

  createStyle() {
    const element = document.createElement("style")
    element.textContent = `
      * { box-sizing: border-box; }
    
      input {
        display: inline-block;
        height: 24px;
        border-radius: 0;
        border: 1px inset #bbb;
        box-shadow: inset 0 1px #0006;
      }

      input:focus, button:focus {
        outline: 2px solid #99d2f8;
      }

      .spacer {
        display: inline-block;
        width: 6px;
      }

      button {
        display: inline-block;
        height: 24px;
        min-width: 64px;
        border-radius: 5px;
        border: 1px inset #1117;
        box-shadow:
          inset 2px 0 #fffa,
          inset 0 2px #fffa,
          inset -2px 0 #0002,
          inset 0 -2px #0002;
        background: #ddd;
        cursor: pointer;
        
      }

      button:hover {
        background: #d6d6d6;
      }

      button:active {
        box-shadow:
          inset 2px 0 #0002,
          inset 0 2px #0002,
          inset -2px 0 #fffa,
          inset 0 -2px #fffa;
      }

    `
    return element
  }

  submit() {
    window.location = this.pattern.replace("%q", this.input.value)
  }
})