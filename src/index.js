// inferno module
import Inferno from 'inferno';

// routing modules
import { Router, Route } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';

// app components
import MyApp from './MyApp';
import LeftMenu from './components/LeftMenu';
import Home from './components/Home';
import TemplateManager from './components/TemplateManager';
import ProductManager from './components/ProductManager';

const browserHistory = createBrowserHistory();

const routes = (
	<Router history={ browserHistory }>
		<Route component={ MyApp }>
			<Route path="/" component={ Home } />
			<Route path="/template" component={ TemplateManager } />
			<Route path="/products" component={ ProductManager } />
		</Route>
	</Router>
);

Inferno.render(routes, document.getElementById('content'));
Inferno.render(< LeftMenu />, document.getElementById('left-menu'));