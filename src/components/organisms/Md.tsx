import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SimpleMDE from 'react-simplemde-editor';
import marked from 'marked';
import 'easymde/dist/easymde.min.css';

const toolbar = [
  {
    name: 'save',
    action: function customFunction(editor: { value: () => any }) {
      alert(editor.value());
      // save action
    },
    className: 'fa fa-save',
    title: 'Save',
  },
  '|',
  'bold',
  'italic',
  'heading',
  '|',
  'quote',
  'unordered-list',
  'ordered-list',
  '|',
  'link',
  'image',
  '|',
  'preview',
  // 'side-by-side',
  // 'fullscreen',
  '|',
  'guide',
] as const;

const Md = () => {
  const classes = useStyles();

  const [markdown, setMarkdown] = useState('');
  console.log(markdown);

  return (
    <div className={classes.root}>
      <div className={classes.editor}>
        <SimpleMDE onChange={(e) => setMarkdown(e)} options={{ toolbar: toolbar }} />
      </div>
      <div className={classes.preview}>
        <span dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
      </div>
    </div>
  );
};

/**
 * スタイルを適用する。
 *
 * @returns {ClassNameMap<'root' | 'editor' | 'preview'>} cssプロパティ
 */
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
    },
    editor: {
      width: '48%',
      paddingRight: '2%',
    },
    preview: {
      width: '48%',
      paddingLeft: '2%',
      paddingTop: 40,
    },
  }),
);

export default Md;
