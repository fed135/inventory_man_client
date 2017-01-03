import Inferno from 'inferno';

export default function LeftMenu() {
	return (
		<div>
			<a href="/"><h2>Menu</h2></a>
			<div class='box'>
				<div class="collapsable">
					<a href="/template">Produits</a>
				</div>
				<div class="collapsable">
					<a href="/products">Inventaire</a>
				</div>
				<div class="collapsable">
					<p>Rapports</p>
				</div>
			</div>
		</div>
	);
}