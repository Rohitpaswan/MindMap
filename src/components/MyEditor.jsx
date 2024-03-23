import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import  { convert } from 'html-to-text';

const MyEditor = ({ placeholder ,setPlainText, plainText}) => {
  
  const [content, setContent] = useState('');
	const editor = useRef(null);
	const config = useMemo (
    () =>({
      buttons: 'bold,italic,underline,ul,ol,fontSize,font',
      
      fontSize: '10,12,14,16,18,20,22,24,26,28,30',

    }), []
  )
	useEffect(() => {
    if (editor.current && editor.current.value) {
      const htmlContent = editor.current.value; // Get HTML content from JoditEditor
      const plainTextContent = convert(htmlContent); // Convert HTML to plain text
      setPlainText(plainTextContent);
    } else {
      setPlainText(''); // Handle cases where editor value is unavailable
    }
  }, [content, editor, setPlainText]);
  

	

	return (
		<JoditEditor
			ref={editor}
			value={content}
      onChange={newContent => setContent(newContent)}
		
      config={config}
		/>
  
	);
};

export default MyEditor