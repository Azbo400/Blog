webpackJsonp([0x6005ad0e10e1],{337:function(o,e){o.exports={data:{markdownRemark:{html:"<p>Google Blockly is an amazing Javascript library built by Google to offer an intearactive build block enviorenment with visual programming editors. It is a great way to make an educational app and naturally, you would probably want to use it with React.js so we will cover that in this tutorial.</p>\n<p>To use Blockly with React we would want to get <a href=\"https://www.npmjs.com/package/node-blockly\" target=\"_blank\"><code>node-blockly</code></a>. Node Blockly would allow us to use our blockly code in JavaScript to use it with React.</p>\n<p>Install Blockly:\n<code>npm i node-blockly</code></p>\n<p>Next in the file that you want to use Blockly in, import it. Also import the <code>javascript_compressed</code> file from the file like so:</p>\n<pre><code>import Blockly from 'node-blockly/browser'\nimport 'node-blockly/lib/javascript_compressed';\n</code></pre>\n<p>Great! Now that we have Blockly in our file we can load our toolbox. Our toolbox will load the xml for all of our blocks we will end up using in our app, and if you make custom blocks you can add them to the toolbox. You can learn more about the toolbox <a href=\"https://developers.google.com/blockly/guides/configure/web/toolbox\" target=\"_blank\">here</a></p>\n<pre><code>const toolbox = `\n        &#x3C;xml>\n           &#x3C;block type=\"controls_if\">&#x3C;/block>\n           &#x3C;block type=\"controls_whileUntil\">&#x3C;/block>\n         &#x3C;/xml\n    `\n</code></pre>\n<p>Now we have the toolbox and we have Blockly imported we want to get started writing our component and since we want Blockly to be responsive, we need to writing a bit of code such as an <code>onresize</code> function.</p>\n<p>First lets work on the constructor:\nLets bind a function <code>blockly</code> for use in our component</p>\n<pre><code>constructor(props) {\n  super(props);\n  this.blockly = this.blockly.bind(this);\n}\n</code></pre>\n<p>Now lets work on our Blockly function</p>\n<pre><code>blockly() {\n  var workspacePlayground = Blockly.inject(this.blocklyDiv, {toolbox: toolbox})\n  window.addEventListener('resize', this.onresize, false);\n  this.onresize();\n  Blockly.svgResize(workspacePlayground);\n}\n</code></pre>\n<p>Above in our blockly function we add an event listener to see if the user resizes their screen to update the dimensions of blockly. We then call <code>onresize()</code> let's write that function.</p>\n<pre><code>onresize = (e) => {\n  var element = this.editor;\n  var x = 0;\n  var y = 0;\n  do {\n    x += element.offsetLeft;\n    y += element.offsetTop;\n    element = element.offsetParent;\n  } while (element);\n  // Position blocklyDiv over blocklyArea.\n  this.blocklyDiv.style.left = x + 'px';\n  this.blocklyDiv.style.top = y + 'px';\n  this.blocklyDiv.style.width = this.editor.offsetWidth + 'px';\n  this.blocklyDiv.style.height = this.editor.offsetHeight + 'px';\n}\n</code></pre>\n<p>(As we are using an arrow function there is no need to bind <code>this</code> function as <code>this</code> is in the scope outside of the function)</p>\n<p>Now that we have the resizing functions down we can render Blockly: </p>\n<pre><code>render() { \n  return (\n    &#x3C;div>\n      &#x3C;div id=\"editor\" className=\"editortop\" ref={ref => {this.editor = ref}} style={{width: '100%'}}>\n        &#x3C;div id=\"blocklyDiv\" className=\"blocky-div\" ref={ref => {this.blocklyDiv = ref}} style={{position: 'absolute'}}>&#x3C;/div>\n      &#x3C;/div>\n    &#x3C;/div>\n  );\n}\n</code></pre>\n<p>Now that we have the basic functionality down, we can write things such as a save function, load function, and a code function to get the JavaScript code behind the Blockly element:</p>\n<pre><code>save = () => {\n  // SAVE USER BLOCKS TO LOCALSTORAGE\n  var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);\n  localStorage.setItem('workspace', Blockly.Xml.domToText(xml));\n  Blockly.mainWorkspace.clear();\n}\n\nload = () => {\n  // LOAD USER DATA FROM SAVE FUNCTION (SAVE USER BLOCKS TO LOCALSTORAGE)\n  console.log(Blockly.mainWorkspace);\n  var xml = Blockly.Xml.textToDom(localStorage.getItem('workspace'));\n  Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace); \n}\n\nrun = () => {\n  // RUN CODE RETURNED FROM BLOCKLY ELEMENT\n  var code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());\n  console.log(code);\n}\n</code></pre>\n<h4>In the end here is how your code can look like</h4>\n<p>This example contains functions to save, load, and run the users code </p>\n<p><em>src/app.js</em></p>\n<pre><code>import React, { Component } from 'react';\nimport Blockly from 'node-blockly/browser'\nimport '../customblocks.js'\n\nconst toolbox = `\n        &#x3C;xml>\n           &#x3C;block type=\"controls_if\">&#x3C;/block>\n           &#x3C;block type=\"controls_whileUntil\">&#x3C;/block>\n         &#x3C;/xml\n    `\n\nclass App extends Component {\n  constructor(props) {\n    super(props);\n    this.blockly = this.blockly.bind(this);\n  }\n\n  onresize = (e) => {\n    var element = this.editor;\n    var x = 0;\n    var y = 0;\n    do {\n      x += element.offsetLeft;\n      y += element.offsetTop;\n      element = element.offsetParent;\n    } while (element);\n    // Position blocklyDiv over blocklyArea.\n    this.blocklyDiv.style.left = x + 'px';\n    this.blocklyDiv.style.top = y + 'px';\n    this.blocklyDiv.style.width = this.editor.offsetWidth + 'px';\n    this.blocklyDiv.style.height = this.editor.offsetHeight + 'px';\n  }\n\n  blockly() {\n    var workspacePlayground = Blockly.inject(this.blocklyDiv, {toolbox: toolbox})\n    window.addEventListener('resize', this.onresize, false);\n    this.onresize();\n    Blockly.svgResize(workspacePlayground);\n  }\n\n  componentDidUpdate() {\n    window.removeEventListener('resize', this.blockly, false)\n  } \n\n  save = () => {\n    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);\n    localStorage.setItem('workspace', Blockly.Xml.domToText(xml));\n    Blockly.mainWorkspace.clear();\n  }\n\n  load = () => {\n    console.log(Blockly.mainWorkspace);\n    var xml = Blockly.Xml.textToDom(localStorage.getItem('workspace'));\n    Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace); \n  }\n\n  run = () => {\n    // work on run function\n    var code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());\n    console.log(code);\n  }\n\n  render() { \n    return (\n      &#x3C;div>\n        &#x3C;div id=\"editor\" className=\"editortop\" ref={ref => {this.editor = ref}} style={{width: '100%'}}>\n          &#x3C;div id=\"blocklyDiv\" className=\"blocky-div\" ref={ref => {this.blocklyDiv = ref}} style={{position: 'absolute'}}>&#x3C;/div>\n        &#x3C;/div>\n        {/* Buttons to save, run, load the code  */}\n        &#x3C;button onClick={this.save}>Save Workspace&#x3C;/button>\n        &#x3C;button onClick={this.load}>Restore&#x3C;/button>\n        &#x3C;button onClick={this.run}>Run&#x3C;/button>\n      &#x3C;/div>\n    );\n  }\n}\n \nexport default App;\n</code></pre>\n<p>Now Blockly is pretty much added into our app. You can go further and add custom blocks to your application for Google Blockly to be suitable your individual needs and what is best for your application. </p>\n<p>Learn more about custom blocks and how to make them, return code behind them, and define read this article <a href=\"https://developers.google.com/blockly/guides/create-custom-blocks/overview\" target=\"_blank\">here</a></p>\n<p>You can create custom blocks <a href=\"https://blockly-demo.appspot.com/static/demos/blockfactory/index.html\" target=\"_blank\">here</a></p>\n<p>Learn more about the toolbox <a href=\"https://developers.google.com/blockly/guides/configure/web/toolbox\" target=\"_blank\">here</a></p>\n<p>Thanks for reading!</p>",frontmatter:{date:"December 17, 2018",path:"/how-to-use-google-blockly-with-react",title:"How to Use Google Blockly with React.js"}}},pathContext:{}}}});
//# sourceMappingURL=path---how-to-use-google-blockly-with-react-15fe9fc25a00498be52d.js.map