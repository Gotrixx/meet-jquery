/* leny/meet-jquery
 *
 * /src/js/jscripts.js - main script
 *
 * coded by Gotrixx
 * started at 13/02/2017
 */

// TODO: with jQuery

let $trombinoFigures;

let $tabs;

const fChangeTab = function ( oEvent ) {
	oEvent.preventDefault();

	$tabs.parent().filter( ".active" ).removeClass( "active" );// filter est un filtre css donc il faut le . de la class
	$( this ).parent().addClass( "active" );
	$( ".tab-content .tab-pane.active" ).removeClass( "active" );
	$( `#${ $( this ).data( "tab-target" ) }` ).addClass( "active" );
};

const fHandleTrombino = function() {
	$trombinoFigures.filter( ":visible" ).fadeOut( function() {
		let $next = $( this ).next();
		if ($next.length === 0) {
			$next = $trombinoFigures.first();
		}
		$next.fadeIn();
	} );
};

$( function() {

	// 1. link with rel=external
	$( 'a[rel*="external"]' ).attr( "target", "_new" );

	// 2. tab
	( $tabs = $( "ul.nav.nav-tabs a" ) ).on( "click", fChangeTab );

	// 3. trombinoscope
	$trombinoFigures = $( "#trombino figure" );
	$trombinoFigures.hide().first().show();
	setInterval( fHandleTrombino, 1000 );

} );
