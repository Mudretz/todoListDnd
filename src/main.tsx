import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/components/App";

async function enableMocking() {
    const { worker } = await import("./mocks/browser");
    return worker.start();
}

const rootElement = ReactDOM.createRoot(document.getElementById("root")!);

enableMocking().then(() => {
    rootElement.render(<App />);
});
