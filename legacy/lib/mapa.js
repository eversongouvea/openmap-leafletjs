/*
 * Mapa
 */
var mapaOperacao 				= null;
var markersOperacao 			= [];
var infoWindowMarkersOperacao 	= [];
var arrLatLon 					= [];
var polyline 					= null;

//Configura��es Default do mapa
var mapaCenterInicial	= [-14.179186, -50.449219];
var mapaZoomInicial 	= 3;
var mapaZoomAlto  		= 8;
var mapaZoomBaixo 		= 16;

//Info mapa inicial
var latLongFocoMapa = null;


//Inicia o mapa principal
function initMapa()
{
	this.mapaOperacao 	= L.map(document.getElementById("mapa")).setView(mapaCenterInicial, mapaZoomInicial);
	
	  var url 	  = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
	  var config  = {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	  };
		
    L.tileLayer(url, config).addTo(this.mapaOperacao);
}


//Create marker
function addPositionMapa(rows, focoPosicao)
{
	console.log(rows);
	
	rows = jQuery.parseJSON(rows);
	
	if(mapaOperacao != null)
	{
		if(rows.length > 0)
		{
			$.each(rows, function(i, row) 
			{
				var latLon = [row.latitude, row.longitude];
				
				var icone = "";
				
				L.icon({iconUrl: 'img/point_car.png'});
				
				
				switch (row.tipoVeiculo) {
					case 1:
						icone = L.icon({iconUrl: 'img/point_car.png'});
						break;
					case 2:
						icone = L.icon({iconUrl: 'img/point_motorcycle.png'});
						break;
					case 3:
						icone = L.icon({iconUrl: 'img/point_lorry.png'});
						break;
					case 4:
						icone = L.icon({iconUrl: 'img/point_lorryflatbed.png'});
						break;
					case 5:
						icone = L.icon({iconUrl: 'img/point_mobile.png'});
						break;
				}
				
				//Cria o Marker
				L.marker(latLon, {icon: icone, 
								  title: row.tituloVeiculo})
				 .addTo(mapaOperacao)
				 .bindPopup(htmlData)
				 .openPopup();
							
				if(focoPosicao)
				{
					if(i == 0)
					{
						latLongFocoMapa = latLon;
					}
				}
				
				/*
				var infowindow = new google.maps.InfoWindow({
				  content: getInfoWindowDefault(row), 
				  size: new google.maps.Size(3, 2)
				});

				//Evento de click
				google.maps.event.addListener(marker, 'click', function(){
					for (var i = 0; i < infoWindowMarkersOperacao.length; i++){
					   infoWindowMarkersOperacao[i].close();
					}
					
					infowindow.open(mapaOperacao, marker);
				});
				
				//Evento de duplo click
				google.maps.event.addListener(marker, 'dblclick', function(){
					if(mapaOperacao.getZoom() == mapaZoomBaixo){
						mapaOperacao.setZoom(mapaZoomAlto);
					
	    			}else{
	    				mapaOperacao.setZoom(mapaZoomBaixo);
	    			}
	    			
					mapaOperacao.setCenter(marker.getPosition());
				});
				
				//Array de info
				infoWindowMarkersOperacao.push(infowindow);
								
				//Array de lat/long
				arrLatLon.push(latLon);	
				
				//Coloca os markers no array
				markersOperacao.push(marker);
				*/
			});
		}
		
		if(latLongFocoMapa != null)
		{
			mapaOperacao.setCenter(latLongFocoMapa);
			mapaOperacao.setZoom(mapaZoomBaixo);
		}
	}
}








//Oculta o mapa
function hideMapa()
{
	$("#mapa").css({"width": "0%",
					"height": "0%",
					"border": "0px"});
}
  
//Exibe o mapa
function showMapa()
{
	$("#mapa").css({"margin-left": "5px",
					"left": "65%",
					"width": "34%",
					"height": "62%",
					"border": "1px #ccc solid"});

	google.maps.event.trigger(mapaOperacao, 'resize');
	
	defineMapa();
}

//Exibe o mapa Full Screen
function showMapaFull()
{
	$("#mapa").css({"margin-left": "0px",
					"left": "0%",
					"width": "100%",
					"height": "92%",
					"border": "0"});
	
	google.maps.event.trigger(mapaOperacao, 'resize');   
	
	defineMapa();
}



//Create marker
function addPositionMapa(rows, focoPosicao)
{
	rows = jQuery.parseJSON(rows);
	
	if(mapaOperacao != null)
	{
		if(rows.length > 0)
		{
			$.each(rows, function(i, row) 
			{
				var latLon = new google.maps.LatLng(row.latitude, row.longitude);
				
				var icone = "";
				
				switch (row.tipoVeiculo) {
					case 1:
						icone = "img/point_car.png";
						break;
					case 2:
						icone = "img/point_motorcycle.png";
						break;
					case 3:
						icone = "img/point_lorry.png";
						break;
					case 4:
						icone = "img/point_lorryflatbed.png";
						break;
					case 5:
						icone = "img/point_mobile.png";
						break;
				}
				
				//Cria o Marker
				var marker = new google.maps.Marker({
					map: mapaOperacao,
					position: latLon,
					title: row.tituloVeiculo,
					icon: icone
				});
							
				if(focoPosicao)
				{
					if(i == 0)
					{
						latLongFocoMapa = latLon;
						marker.setAnimation(google.maps.Animation.BOUNCE);
					}
				}
								
				var infowindow = new google.maps.InfoWindow({
				  content: getInfoWindowDefault(row), 
				  size: new google.maps.Size(3, 2)
				});

				//Evento de click
				google.maps.event.addListener(marker, 'click', function(){
					for (var i = 0; i < infoWindowMarkersOperacao.length; i++){
					   infoWindowMarkersOperacao[i].close();
					}
					
					infowindow.open(mapaOperacao, marker);
				});
				
				//Evento de duplo click
				google.maps.event.addListener(marker, 'dblclick', function(){
					if(mapaOperacao.getZoom() == mapaZoomBaixo){
						mapaOperacao.setZoom(mapaZoomAlto);
					
	    			}else{
	    				mapaOperacao.setZoom(mapaZoomBaixo);
	    			}
	    			
					mapaOperacao.setCenter(marker.getPosition());
				});
				
				//Array de info
				infoWindowMarkersOperacao.push(infowindow);
								
				//Array de lat/long
				arrLatLon.push(latLon);	
				
				//Coloca os markers no array
				markersOperacao.push(marker);
			});
		}
		
		if(latLongFocoMapa != null)
		{
			mapaOperacao.setCenter(latLongFocoMapa);
			mapaOperacao.setZoom(mapaZoomBaixo);
		}
	}
}

//Adiciona Polyline no mapa
function addPolyline()
{
	if(arrLatLon.length > 0)
	{
		polyline = new google.maps.Polyline({
			map: mapaOperacao,
			path: arrLatLon,
			strokeColor: "#ff0000",
			strokeOpacity: 0.6,
			strokeWeight: 5
		});
	}
}

//Limpa mapa
function clearMapa() 
{
	if(mapaOperacao != null)
	{	
		for(var i = 0; i < markersOperacao.length; i++) 
		{
			infoWindowMarkersOperacao[i] = null;
			markersOperacao[i].setMap(null);
		}
	 
		polyline.setMap(null);
			
		markersOperacao 			= [];
		infoWindowMarkersOperacao 	= [];
		arrLatLon 					= [];
		polyline 					= new google.maps.Polyline();
		latLongFocoMapa 			= null;
		
		mapaOperacao.setCenter(mapaCenterInicial);
		mapaOperacao.setZoom(mapaZoomInicial);
	}
}

//Info mapa
function getInfoWindowDefault(obj)
{
	var html  = "<table cellspacing=\"2\" cellpadding=\"2\" class=\"info\">";
		html +=	"	<tr>";
		html +=	"		<th>Veiculo: </th>";
		html +=	"		<td>"+obj.tituloVeiculo+"</td>";
		
		if(obj.placa != null && obj.placa != "")
		{	
			html +=	"	<th>Placa: </th>";
			html +=	"	<td>"+obj.placa+"</td>";
		}
		
		html +=	"	</tr>";
		html +=	"	<tr>";
		html +=	"		<th>Velocidade: </th>";
		html +=	"		<td>"+obj.speed+" Km/h</td>";
		html +=	"	</tr>";
		html +=	"	<tr>";
		html +=	"		<th>Data Sistema: </th>";
		html +=	"		<td>"+obj.received+"</td>";
		html +=	"		<th>Data Evento: </th>";
		html +=	"		<td>"+obj.datetime+"</td>";
		html +=	"	</tr>";
		html +=	"	<tr>";
		html +=	"		<th>Latitude: </th>";
		html +=	"		<td>"+obj.latitude+"</td>";
		html +=	"		<th>Longitude: </th>";
		html +=	"		<td>"+obj.longitude+"</td>";
		html +=	"	</tr>";
		html +=	"	<tr>";
		html +=	"		<th>Prox.: </th>";
		html +=	"		<td colspan=\"3\">"+obj.address+"</td>";
		html +=	"	</tr>";
		html +=	"</table>";
		
		return html;
}

//Define configurações do mapa
function defineMapa()
{
	if(latLongFocoMapa != null){
		mapaOperacao.setCenter(latLongFocoMapa);
		
	}else{
		mapaOperacao.setCenter(mapaCenterInicial);
		mapaOperacao.setZoom(mapaZoomInicial);	
	}
}