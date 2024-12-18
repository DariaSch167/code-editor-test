import "./App.css";
import "./styles.scss";
import CodeEditorFull from "./components/CodeEditorFull";

function App() {
  return (
    <main>
      <div className="main__title">
        <h1>Code Editor</h1>
        <p>CodeMirror & Mock-server MirageJS</p>
      </div>
      <CodeEditorFull />
    </main>
  );
}

export default App;
