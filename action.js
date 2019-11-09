//Ceci est la clé qui permet d'accéder à l'API
//pour vous en procurer une incrivez-vous ici: https://www.theaudiodb.com/api_apply.php
const APIKEY = "1";

//En JQuery $(function(){}) correspond à document.ready en JS
$(function () {
	//Aau click sur le bouton de recherche on déclenche la requete ajax vers le l'API theAudioDB
    $("#searching").click(function () {
        let artist = $("#artist").val(); //On recupere la valeur dans le champ de recherche
        let request = `https://theaudiodb.com/api/v1/json/${APIKEY}/searchalbum.php?s=${artist}`;
		$("#result").empty(); //On vide la div de 'result'
        $.ajax({
            url: request,
            method: "GET"
        }).done(function (data) {
			//On vérifie que la réponse contient des albums
			if(data.album != null){
				$("#artist").val(''); //On efface le champ de recherche
				let albums = data.album; //On recupere les infos souhaitez
				//On effectue une iteration afin de creer les differentes div qui correspondent aux albums trouves
				albums.forEach((album) => {
					$("#result").append(`
					<div class="col-xl-3 col-lg-4 col-md-5 col-sm-6>
						<div class="card">
							<img src="${album.strAlbumThumb}" class="card-img-top"/>
							<div class="card-body">
								<h5 class="card-title">${album.strAlbum}</h5>
								<h6 class="card-subtitle mb-2 text-muted">${album.intYearReleased}</h6>
								<p class="card-text">${album.strDescriptionEN}</p>
							</div>
						</div>
					</div>`
					);
				});
			}
			//Sinon on affiche un message d'invitant l'utilisateur à effectuer une autre recherche
			else{
				$("#result").append(`<h2>Nous n'avons pas trouvé cet artiste ou ce groupe. Veuillez tenter une autre recherche</h2>`);
			}
		//Si la requete n'aboutie pas
        }).fail(function() {
			$("#result").append(`<h2>Une erreur s'est produite, veuillez retenter une nouvelle recherche.</h2>`);			
		});
    });
});