import Inferno from 'inferno';
import Component from 'inferno-component';

import Table from './Table';

class TemplateManager extends Component {
	constructor(props) {
		super(props);

		/*
			id: UUID
			photo: BINARY
			decription: STRING
			colors: SET <STRING>
			price_retail: FLOAT
			category: STRING
		*/

		this.props.cols = [
		    { key: 'photo', label: 'Photo' },
		    { key: 'description', label: 'Description' },
		    { key: 'price_retail', label: 'Prix affiché' },
		    { key: 'category', label: 'Catégorie' },
		    { key: 'actions', label: '' }
		];

		this.props.data = [];

		fetch('http://0.0.0.0:3000/template')
			.then((response) => response.json().then(this.updateData.bind(this)));
	}

	addTemplate() {
		console.log('Showing prompt');
	}

	render() {
		return (
			<div>
				<h2>Gestion de Produits</h2>
				<div class="row">
					<div class="navbar">
						<button type="button" onClick={ this.addTemplate } class="btn btn-success">Ajouter un produit</button>
					</div>
				</div>
				<div class="row">
					<Table cols={this.props.cols} data={this.props.data} />
				</div>
			</div>
		);
	}

	updateData(res) {
		this.props.data = res;
		// Test Data
		this.props.data = [
			{photo: 'test.jpg', description:'Intelli-frais moyen profond', price_retail: 50, category: 'Intelli-frais' },
			{photo: 'test2.jpg', description:'Intelli-frais grand profond', price_retail: 65, category: 'Intelli-frais' },
			{photo: 'foo.jpg', description:'Chauffe-et-sert 60ml', price_retail: 17.50, category: 'Chauffe-et-sert' }
		];
		

		this.setState(this.state); 
	}
}

export default TemplateManager;