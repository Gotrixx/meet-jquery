/* leny/meet-jquery
 *
 * /src/js/jscripts.js - main script
 *
 * coded by Gotrixx
 * started at 13/02/2017
 */

// TODO: with jQuery

const rEmailValidation = /([\w-\.]+)@((?:[\w]+\.)+)([a-z]{2,})/i; //\w = a-zA-Z0-9_

let $trombinoFigures, $commentForm, $emailInput, $nameInput, $commentTextarea;

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

const fCheckEmail = function() {
	let sEmail = ( $emailInput.val() || "" ).trim(),
		bIsValid = rEmailValidation.test( sEmail );

	$emailInput.parents( ".control-group" ).toggleClass( "error", !bIsValid );
	return bIsValid;
};

const fCheckName = function() {
	let sName = ( $nameInput.val() || "" ).trim(),
		bIsValid = sName.length >== 4;

	$nameInput.parents( ".control-group" ).toggleClass( "error", !bIsValid );
	return bIsValid;
};

const fCheckComment = function() {
	let sComment = ( $commentTextarea.val() || "" ).trim(),
		bIsValid = sComment.length >== 10 && sComment.length <== 140;

	$commentTextarea.parents( ".control-group" ).toggleClass( "error", !bIsValid );
	return bIsValid;
};

const fHandleFormValidation = function( oEvent ) {
	let aChecks = [ fCheckEmail(), fCheckName(), fCheckComment() ],
		bAllIsOk;

	bAllIsOk = aChecks.reduce( function ( bPrevious, bCurrent ) {
		return bPrevious && bCurrent;
	}, true );

	if ( bAllIsOk ) {
		return true;
	}

	window.alert( "Veuillez remplir correctement les champs du formulaire" );
	return false;
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

	// 4. handle form validation
	( $commentForm = $( "form" ) ).on( "submit", fHandleFormValidation );;
	( $emailInput = $( "#inputEmail" ) ).on( "blur", fCheckEmail );
	( $nameInput = $( "#inputName" ) ).on( "blur", fCheckName );
	( $commentTextarea = $( "#inputComment" ) ).on( "blur", fCheckComment );

} );
