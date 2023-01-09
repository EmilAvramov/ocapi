import ReactDOM from 'react-dom/client';
import App from './App';

import './index.module.scss';
import './reset.scss';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(<App />);
