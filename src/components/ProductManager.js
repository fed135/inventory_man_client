import Inferno from 'inferno';
import Component from 'inferno-component';

import Table from './Table';

class ProductManager extends Component {
	constructor(props) {
		super(props);

		/*
			id: UUID
			template: UUID
			color: STRING
			price_bought: NUMBER
			price_sold: NUMBER
			date_purchased: DATE
			date_sold: DATE
		*/

		this.props.cols = [
		    { key: 'count', label: '#' },
		    { key: 'description', label: 'Produit' },
		    { key: 'color', label: 'Couleur' },
		    { key: 'price_bought', label: 'Prix d\'achat' },
		    { key: 'taxes', label: 'Taxes'},
		    { key: 'recommended_price', label: 'Prix recommendé' },
		    { key: 'actions', label: '' }
		];

		this.props.data = [];
		this.props.templates = [];
		this.props.products = [];

		fetch('http://0.0.0.0:3000/template')
			.then((response) => response.json().then(this.updateTemplates.bind(this)));

		fetch('http://0.0.0.0:3000/product')
			.then((response) => response.json().then(this.updateProducts.bind(this)));
	}

	addItem() {
		console.log('Showing prompt');
	}

	render() {
		return (
			<div>
				<h2>Gestion d'inventaire</h2>
				<div class="row">
					<div class="navbar">
						<button type="button" onClick={ this.addItem } class="btn btn-success">Ajouter un item</button>
					</div>
				</div>
				<div class="row">
					<Table cols={this.props.cols} data={this.props.data} />
				</div>
			</div>
		);
	}

	updateTemplates(res) {
		this.props.templates = res;

		// Test Data
		this.props.templates = [{id: 1, photo: 'test.jpg', description:'Intelli-frais moyen profond', price_retail: 50, category: 'Intelli-frais' }]
	}

	updateProducts(res) {
		this.props.products = res;
		// Test data
		this.props.products = [
			{template: 1, color: 'vert', price_bought: 19, date_purchased: Date.now()},
			{template: 1, color: 'vert', price_bought: 19, date_purchased: Date.now()},
			{template: 1, color: 'vert', price_bought: 22, date_purchased: Date.now()},
			{template: 1, color: 'orange', price_bought: 19, date_purchased: Date.now()},
		];


		// Parse to data
		const u_map = {};
		this.props.products.forEach((product) => {
			const u_key = `${product.template}.${product.color}.${product.price_bought}`;
			if (!u_map[u_key]) {
				u_map[u_key] = { ...product, count: 0 };
				// Map product name
				u_map[u_key].description = this.getTemplate(product.template).description;
				// Compute suggested price
				const bought = Number(u_map[u_key].price_bought) + Number(this.getTemplateTaxes(product.template));
				u_map[u_key].recommended_price = (Math.min(bought * 1.175, this.getTemplate(product.template).price_retail)).toFixed(2);
				// Compute final price price_bought taxes
				u_map[u_key].taxes = this.getTemplateTaxes(product.template);
			}
			u_map[u_key].count++;
		});
		this.props.data = Object.keys(u_map).map(i => u_map[i]);

		this.setState(this.state);
	}

	getTemplate(id) {
		return this.props.templates.filter((template) => template.id === id)[0];
	}

	getTemplateTaxes(id) {
		return (this.getTemplate(id).price_retail * 0.14975).toFixed(2);
	}
}

export default ProductManager;