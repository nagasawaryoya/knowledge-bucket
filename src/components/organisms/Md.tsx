import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SimpleMDE from 'react-simplemde-editor';
import marked from 'marked';
import 'easymde/dist/easymde.min.css';
import { BREAKPOINT } from 'unions/ui-theme/style';

const toolbar = [
  'bold',
  'heading',
  'quote',
  'unordered-list',
  'ordered-list',
  'link',
  'image',
  '|',
  'preview',
] as const;

const Md = React.memo(() => {
  const classes = useStyles();

  const [markdown, setMarkdown] = useState('');

  return (
    <div className={classes.root}>
      <div className={classes.editor}>
        <SimpleMDE
          onChange={(e) => setMarkdown(e)}
          options={{
            toolbar: toolbar,
            status: false,
            minHeight: '500px',
            maxHeight: '500px',
          }}
        />
      </div>
      <div className={classes.preview}>
        <span dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
      </div>
    </div>
  );
});

/**
 * スタイルを適用する。
 *
 * @returns {ClassNameMap<'root' | 'editor' | 'preview'>} cssプロパティ
 */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'flex',
    },
    editor: {
      [theme.breakpoints.down(BREAKPOINT.BASE)]: {
        width: '100%',
      },
      [theme.breakpoints.up(BREAKPOINT.BASE)]: {
        width: '48%',
        paddingRight: '2%',
      },
    },
    preview: {
      [theme.breakpoints.down(BREAKPOINT.BASE)]: {
        display: 'none',
      },
      [theme.breakpoints.up(BREAKPOINT.BASE)]: {
        width: '48%',
        maxHeight: '570px',
        paddingLeft: '2%',
        paddingTop: 50,
        overflow: 'auto',
      },
    },
  }),
);

export default Md;
