import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import styled from "styled-components";
import { Button } from "@mui/material";

export function TextEditor({ limit, value, setValue, submit}) {
  const sizeLimit = limit ?? 4000;
  const [length, setLength] = useState(0);

  const handleInit = (evt, editor) => {
    setLength(editor.getContent({ format: "text" }).length);
  };

  const handleUpdate = (value, editor) => {
    const length = editor.getContent({ format: "text" }).length;
    if (length <= sizeLimit) {
      setValue(value);
      setLength(length);
    }
  };

  const handleBeforeAddUndo = (evt, editor) => {
    const textLength = editor.getContent({ format: "text" }).length;
    if (textLength > sizeLimit) {
      evt.preventDefault();
    }
  };

  return (
    <StyledWrapper className="animate__animated animate__fadeIn animate__slower">
      <Editor
        apiKey="b2mjlchj9oig4j8de3o60g2cqwemte7h9mo7lv648pf7gnoi"
        onInit={handleInit}
        onEditorChange={handleUpdate}
        onBeforeAddUndo={handleBeforeAddUndo}
        value={value}
        init={{
          height: 200,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <p><em>Remaining: {sizeLimit - length}</em></p>
      <Button variant="contained" color="primary" onClick={ submit } disabled={!value}>Enviar</Button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  flex: 0 1 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  margin: 0.2em auto 0.5em auto;
   & > div {
    flex: 0 1 100%;
    border-radius: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    margin-bottom: 0.5em;
    }
   & > p {
    flex: 1 1 50%;
    text-align: left;
    margin: 0.5em 1em;
    color: gray;
   }
   & > button {
    max-width: 9em;
    flex: 0 1 100%;
    padding: 0.5em;
    font-size: 1em;

    &:disabled {
      background-color: #ccc;
    }
   }
`;
