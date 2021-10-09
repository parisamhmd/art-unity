import CKEditor from "react-ckeditor-component";
import React, { Component } from "react";
class Example extends Component {
  constructor(props) {
    super(props);
    this.updateContent = this.updateContent.bind(this);
    this.state = {
      content: "content",
    };
  }

  updateContent(newContent) {
    this.setState({
      content: newContent,
    });
  }

  onChange(evt) {
    console.log("onChange fired with event info: ", evt);
    var newContent = evt.editor.getData();
    this.setState({
      content: newContent,
    });
  }

  onBlur(evt) {
    console.log("onBlur event called with event info: ", evt);
  }

  afterPaste(evt) {
    console.log("afterPaste event called with event info: ", evt);
  }

  render() {
    const height = "200px";
    const width = "300px";
    const plugins = {
      bidi: 1,
      font: 1,
      justify: 1,
      link: 1,
      undo: 1,
      magicline: 1,
    };
    return (
      <CKEditor
        activeClass="p10"
        content={this.state.content}
        events={{
          blur: this.onBlur,
          afterPaste: this.afterPaste,
          change: this.onChange,
        }}
        onInstanceReady={(ev) =>
          (ev.editor.dataProcessor.writer.lineBreakChars = "")
        }
        // data={data}
        // onChange={handleChange}
        // readOnly={disabled}
        // config={{
        //   extraPlugins: Object.keys(plugins).join(","),
        //   toolbarGroups: [
        //     { name: "basicstyles", groups: ["basicstyles"] },
        //     { name: "clipboard", groups: ["clipboard", "undo"] },
        //     { name: "links" },
        //     { name: "paragraph", groups: ["align", "bidi"] },
        //     { name: "styles" },
        //     { name: "colors" },
        //   ],
        //   contentsLangDirection: "rtl",
        //   font_names: "B Nazanin; B Titr; B Roya; Vazir;",
        //   language: "en",
        //   height,
        //   width,
        //   fullPage: true,
        //   resize_enabled: false,
        //   fontSize_sizes:
        //     "8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px;",
        //   dataIndentationChars: "",
        //   fillEmptyBlocks: false,
        // }}
      />
      //   <CKEditor
      //     activeClass="p10"
      //     content={this.state.content}
      //     events={{
      //       blur: this.onBlur,
      //       afterPaste: this.afterPaste,
      //       change: this.onChange,
      //     }}
      //   />
    );
  }
}
export default Example;
