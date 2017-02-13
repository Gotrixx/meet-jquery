/* leny/meet-jquery
 *
 * /src/js/scripts.js - Main script
 *
 * coded by leny@flatLand!
 * started at 13/02/2017
 */

let iTrombinoCurrentIndex = 0,
 	iTrombinoLength,
 	$trombinoFigures;

const fHandleTabClick = function( oEvent ) {
	oEvent.preventDefault();
	const $target = oEvent.currentTarget;

	if ( $target.parentNode.classList.contains( "active" ) ) {
		return;
	}

	document.querySelector( "ul.nav-tabs li.active" ).classList.remove( "active" );
	$target.parentNode.classList.add( "active" );
	document.querySelector( ".tab-content .tab-pane.active" ).classList.remove( "active" );
	document.getElementById( $target.getAttribute( "data-tab-target" ) ).classList.add( "active" );
};

const fUpdateTrombino = function() {
	$trombinoFigures[ iTrombinoCurrentIndex ].classList.add( "hide" );
	if ( ++iTrombinoCurrentIndex === iTrombinoLength ) {
		iTrombinoCurrentIndex = 0;
	}
	$trombinoFigures[ iTrombinoCurrentIndex ].classList.remove("hide");
};

// When page load...
window.addEventListener( "load", function() {

	// 1. select a with rel=external attributes.
	Array.from( document.querySelectorAll( 'a[rel*="external"]' ) ).forEach( function( $elt ) {
		$elt.addEventListener( "click", function( oEvent ) {
			$elt.setAttribute( "target", "_new" );
		} );
	} );

	// 2. tab macanism
	Array.from( document.querySelectorAll( 'ul.nav.nav-tabs a' ) ).forEach( function( $elt ) {
		$elt.addEventListener( "click", fHandleTabClick )
	} );

	// 3. trombino
	document.querySelectorAll( "#trombino figure:not(:first-of-type)" ).forEach( function( $elt ) {
		$elt.classList.add( "hide" );
	} );
	$trombinoFigures = Array.from( document.querySelectorAll( "#trombino figure" ) );
	iTrombinoLength = $trombinoFigures.length;
	setInterval( fUpdateTrombino, 1000 );

} );
