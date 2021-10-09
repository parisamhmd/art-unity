// import React from "react";
// import ReactQuill, { Quill } from "react-quill";
// import axios from "axios";
// import { useMutation } from "react-query";

// // #1 import quill-image-uploader
// import ImageUploader from "quill-image-uploader";

// // #2 register module
// Quill.register("modules/imageUploader", ImageUploader);

// const Editor = () => {
//   const [text, setText] = React.useState("");

//   const uploadFile = async (data) => {
//     const res = await axios.post("/admin/upload?type=art", data);
//     return res.data;
//   };
//   const { mutate: upload, isLoading } = useMutation(uploadFile);

//   const modules = {
//     // #3 Add "image" to the toolbar
//     toolbar: [["bold", "italic", "image"]],
//     // # 4 Add module and upload function
//     imageUploader: {
//       upload: (file) => {
//         const data = new FormData();
//         data.append("file", file);
//         return upload(data);
//         // new Promise((resolve, reject) => {
//         //   const formData = new FormData();
//         //   formData.append("image", file);
//         //   console.log("send");

//         // fetch(
//         //   "https://api.imgbb.com/1/upload?key=d36eb6591370ae7f9089d85875e56b22",
//         //   {
//         //     method: "POST",
//         //     body: formData
//         //   }
//         // )
//         //   .then((response) => response.json())
//         //   .then((result) => {
//         //     console.log(result);
//         //     resolve(result.data.url);
//         //   })
//         //   .catch((error) => {
//         //     reject("Upload failed");
//         //     console.error("Error:", error);
//         //   });
//         // });
//       },
//     },
//   };

//   const formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "indent",
//     "link",
//     "image",
//     "imageBlot", // #5 Optinal if using custom formats
//   ];

//   return (
//     <ReactQuill
//       theme="snow"
//       modules={modules}
//       formats={formats}
//       value={text}
//       onChange={(e) => {
//         console.log(e);
//       }}
//     >
//       <div className="my-editing-area" />
//     </ReactQuill>
//   );
// };

// export default Editor;
import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import BlotFormatter from "quill-blot-formatter";
import ImageUploader from "quill-image-uploader";
import { useMutation } from "react-query";
import axios from "axios";

Quill.register("modules/imageUploader", ImageUploader);
Quill.register("modules/blotFormatter", BlotFormatter);

const Editor = () => {
  const [value, setValue] = React.useState("");

  const uploadFile = async (data) => {
    const res = await axios.post("/admin/upload?type=art", data);
    return res.data;
  };
  const { mutate: upload, isLoading } = useMutation(uploadFile);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "image"],
    ],
    blotFormatter: {},
    // imageUploader: {
    //   upload: (file) => {
    //     const data = new FormData();
    //     data.append("file", file);
    //     return uploadFile(data).then((response) => {
    //       console.log(response.url);
    //       return response.url;
    //     });
    //
    // upload(data);
    // return new Promise((resolve, reject) => {
    //   const formData = new FormData();
    //   formData.append("file", file);
    //   console.log("send");
    //   uploadFile(formData).then((response) => {
    //     console.log(response.url);
    //   });
    //   fetch("/admin/upload?type=art", {
    //     method: "POST",
    //     body: formData,
    //   })
    //     .then((response) => response.json())
    //     .then((result) => {
    //       console.log(result);
    //       resolve(result.data.url);
    //     })
    //     .catch((error) => {
    //       reject("Upload failed");
    //       console.error("Error:", error);
    //     });
    // });
    //   },
    // },
    // imageUploader: {
    //   upload: (file) => {
    //     // return new Promise((resolve, reject) => {
    //     //   const formData = new FormData();
    //     //   formData.append("file", file);
    //     //   const data = axios
    //     //     .post("http://37.152.187.245:5000/admin/upload?type=art", formData)
    //     //     .then((response) => {
    //     //       // console.log(response.data);
    //     //       resolve("http://37.152.187.245/uploads/art/1631994419904.png");
    //     //       //   resolve(response.data.url);
    //     //     });
    //     //   console.log(data);
    //     //   // .catch((error) => {
    //     //   reject("Upload failed");
    //     //   //   console.error("Error:", error);
    //     //   // });
    //     // });
    //     return new Promise((resolve, reject) => {
    //       const formData = new FormData();
    //       formData.append("file", file);

    //       axios
    //         .post("http://37.152.187.245:5000/admin/upload?type=art", formData)
    //         // .then((response) => response.json())
    //         .then((result) => {
    //           console.log(result.data);
    //           resolve(true);
    //         })
    //         .catch((error) => {
    //           reject("Upload failed");
    //           console.error("Error:", error);
    //         });
    //     });
    //   },
    // },
  };
  return (
    <ReactQuill
      theme="snow"
      value={value}
      //   onChange={setValue}
      modules={modules}
      onChange={(e) => {
        console.log(e);
        setValue(e);
      }}
    />
  );
};

export default Editor;
