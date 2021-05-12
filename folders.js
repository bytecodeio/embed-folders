looker.plugins.visualizations.add({
  options: {
    buttonWidth: {
      section: "Styling",
      type: "string",
      label: "Button Width",
      display: "text",
      default: "320px"
    }
  },
  create: function(element, config) {
  // Insert a <style> tag with some styles we'll use later.
  var css = element.innerHTML = `
    <style>
      .embed-folder-vis {
        // Vertical centering
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        flex-flow: row wrap;
        flex-direction: row;
        flex-wrap: wrap;
        -webkit-box-pack: start;
        justify-content: start;
        -webkit-box-align: center;
        align-items: center;
      }
      .bndREr {
        font-family: Roboto, "Noto Sans", "Noto Sans JP", "Noto Sans CJK KR", "Noto Sans Arabic UI", "Noto Sans Devanagari UI", "Noto Sans Hebrew", "Noto Sans Thai UI", Helvetica, Arial, sans-serif;
        width: ${config.buttonWidth || this.options.buttonWidth.default};
        margin-right: 2.5rem;
        margin-bottom: 2rem;
        display: block;
        font-size: 12px;
        line-height: 1.53846;
        
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        border: 1px solid rgb(222, 225, 229);
        border-radius: 5px;
        box-shadow: rgb(0 0 0 / 8%) 0px 1px 8px, rgb(0 0 0 / 5%) 0px 1px 1px;
        cursor: pointer;
        padding: 0.5rem 1.25rem;
        align-self: stretch;
        text-align: left;
      }
      .bndREr a {
        display: block;
        color: #3a4245;
        text-decoration: none;
      }
    </style>
  `;

  // Create a container element to hold all the buttons
  this._container = element.appendChild(document.createElement("div"));
  this._container.className = "embed-folder-vis";


  },
 update: function(data, element, config, queryResponse) {
    // clear the button container.
    this._container.innerHTML = '';
    
    // add a button for each row in data.
    data.forEach((row,i) => {
      this._tile = this._container.appendChild(document.createElement("div"));
      this._tile.className = "bndREr"
      this._tile.style.width = (config && config.buttonWidth) || this.options.buttonWidth.default;
      this._tile.innerHTML = LookerCharts.Utils.htmlForCell(data[i][queryResponse.fields.dimensions[0].name]);
    });
  }
})
