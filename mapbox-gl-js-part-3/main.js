var mystyle = {
    "version": 8,
    "name": "Mijn eigen Stijl",
    "glyphs": "http://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
    "sprite": "https://maps.tilehosting.com/styles/bright/sprite",
    "sources": {
            "pdok": {
                "type": "vector",
                "tiles": ["http://geodata.nationaalgeoregister.nl/beta/topotiles/{z}/{x}/{y}.pbf"]
            }
    },
    "layers": [
        {
            "id": "background",
            "type": "background",
            "paint": {
                "background-color": "#FFFFFF"
            }
        },
        {
            "id": "admin",
            "type": "fill",
            "source": "pdok",
            "source-layer": "admin",
            "maxzoom": 22,
            "minzoom": 0,
            "filter": ["==", "lod1", "province"],
            "paint": {
                "fill-color": "#54D8CC",
                "fill-outline-color": "#ffffff"
            }
        },
        {
            "id": "building_extrusion",
            "type": "fill-extrusion",
            "source": "pdok",
            "source-layer":"urban",
            "maxzoom": 22,
            "minzoom": 11,
            "paint": {
                "fill-extrusion-height": 20,
                "fill-extrusion-color": "#f37788",
                "fill-extrusion-opacity": 0.9
            }
        },
        {
            "id": "poi-functional",
            "type": "symbol",
            "source": "pdok",
            "source-layer": "label",
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Point"
                ],
                [
                    "in",
                    "lod1",
                    "functional"
                ]
            ],
            "layout": {
                "icon-image": "ice_cream_11"

            },
            "paint": {
                "text-halo-blur": 0.5,
                "text-color": "#79906c",
                "text-halo-width": 1,
                "text-halo-color": "#ffffff"
            }
        },
        {
            "id": "high_prior_labels",
            "type": "symbol",
            "source": "pdok",
            "source-layer": "label",
            "maxzoom": 20,
            "minzoom": 5,
            "filter": [">=", "z_index", 10],
            "layout": {
                "visibility": "visible",
                "symbol-placement": "point",
                "symbol-avoid-edges": false,
                "text-field": "{name}",
                "text-font": ["Open Sans Regular"],
                "text-size": 20,
                "text-max-width": 5,
                "text-anchor": "center",
                "text-line-height": 1,
                "text-justify": "center",
                "text-padding": 20,
                "text-allow-overlap": false
            },
            "paint": {
                "text-opacity": 1,
                "text-color": "#535353"
            }
        },
        {
            "id": "admin-hover",
            "type": "fill",
            "source": "pdok",
            "source-layer": "admin",
            "maxzoom": 22,
            "minzoom": 0,
            "filter": ["==", "name", ""],
            "paint": {
                "fill-color": "#3fa39a"
            }
        }
    ]
};

var map = new mapboxgl.Map({
    container: 'map-container',
    style: mystyle,
    hash: true,
    zoom: 11,
    pitch: 60,
    bearing: 62.4,
    center: [4.8, 52.4]
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl(), "top-left");


//Adding hover effect
map.on("mousemove", "admin", function (e) {
    // panel.innerHTML = e.features[0].properties.name;
    map.setFilter("admin-hover", ["==", "name", e.features[0].properties.name]);
});

// Reset the state-fills-hover layer's filter when the mouse leaves the layer.
map.on("mouseleave", "admin", function () {
    map.setFilter("admin-hover", ["==", "name", ""]);
});

// Get polygon infromation
map.on('click', 'admin', function (e) {
    console.log(e.features[0]);
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(e.features[0].properties.name)
        .addTo(map);

});

// Check for Mapbox gl support:
if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL');
};
