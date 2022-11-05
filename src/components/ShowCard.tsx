/**
 * Show cards are rendered all over the application in different situations
 * Be sure changes made to this component are either conditionally applied
 * or intended to be on every single show card
 * 
 * @returns tsx of a single show card
 */
export default function ShowCard() {
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
