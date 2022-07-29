// The main CodeMirror 5 editor.
import 'codemirror/lib/codemirror.js';

// Hints
import 'codemirror/addon/hint/show-hint.js';

// Folding
import 'codemirror/addon/fold/foldcode.js';

// Comment
import 'codemirror/addon/comment/comment.js';

// Runtime dependency for all CodeMirror modes that are generated using
// https://github.com/codemirror/grammar-mode (i.e. the google_modes).
import 'codemirror-grammar-mode/src/mode.js';

// These versions of the JavaScript and TypeScript modes add support for nested
// HTML-in-JS syntax highlighting, so we prefer these to the stock ones.
import 'google_modes/dist/javascript.js';
import 'google_modes/dist/typescript.js';

// We can't use the stock HTML mode, because it's called "htmlmixed", and our
// HTML-in-JS syntax support assumes that the nested syntax will be called
// either "html" or "google-html". Not sure what is otherwise different about
// the google_mode HTML mode, but it seems fine.
import 'google_modes/dist/html.js';

// Stock CSS mode.
import 'codemirror/mode/css/css.js';

// Stock JSX mode is a combination of Javascript and XML.
// Both Javascript and XML need to be imported for JSX to function.
// The Javascript mode is distict from 'google-javascript' and does not support
// nested back ticks.
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/jsx/jsx.js';
