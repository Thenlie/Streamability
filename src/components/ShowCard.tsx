/**
 * Show cards are rendered all over the application in different situations
 * Be sure changes made to this component are either conditionally applied
 * or intended to be on every single show card
 * 
 * @returns {JSX.Element} | Single show card
 */
export default function ShowCard(): JSX.Element {
	return (
		<>
			{/* TODO: remove temporary styles  */}
			<div style={{ border: 'solid 1px'}}>
				<h2>Show Card</h2>
				<p>Show Title</p>
				<p>Show Details</p>
			</div>
		</>
	);
}
