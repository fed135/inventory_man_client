import Inferno from 'inferno';

export default function MyApp({ children }) {
    return (
    	<div class="container-fluid">
    		{ children } 
	    </div>
    );
}