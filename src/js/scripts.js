/* leny/meet-jquery
 *
 * /src/js/jscripts.js - main script
 *
 * coded by Gotrixx
 * started at 13/02/2017
 */

// TODO: with jQuery

const rEmailValidation = /([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,})/i; //\w = a-zA-Z0-9_

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

const fHandleFormValidation = function( oEvent ) {
	let bHasErrors = false,
		sEmail, sName, sComment;
	// 1. check email
	sEmail = ( $emailInput.val() || "" ).trim();
	if ( !rEmailValidation.test( sEmail ) ) {
		console.error( "email isn't valid !" );
		bHasErrors = true;
	} else {
		consol.info( "email is valid :)" );
	}

	// 2. check name
	sName = ( $nameInput.val() || "" ).trim();
	if ( sName.length < 4 ) {
		console.error( "name isn't valid !" );
		bHasErrors = true;
	} else {
		console.info( "name is valid :)" );
	}

	// 3. check comment
	sComment = ( $commentTextarea.val() || "" ).trim();
	if ( sComment.length < 10 || sComment.length > 140 ) {
		console.error( "comment isn't valid !" );
		bHasErrors = true;
	} else {
		console.info( "comment is valid :)" );
	}

	if (bHasErrors) {
		window.alert( "Veuillez remplir tous les champs du formulaire !" );
		return false;
	}

	return true;
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
	$commentForm = $( "form" );
	$emailInput = $( "#inputEmail" );
	$nameInput = $( "#inputName" );
	$commentTextarea = $( "inputComment" );
	$commentForm.on( "submit", fHandleFormValidation )

} );
