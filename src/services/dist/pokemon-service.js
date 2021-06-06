"use strict";
exports.__esModule = true;
var mock_pokemon_1 = require("../models/mock-pokemon");
var PokemonService = /** @class */ (function () {
    function PokemonService() {
    }
    PokemonService.getPokemons = function () {
        var _this = this;
        if (this.isDev) {
            return fetch('http://localhost:3001/pokemons')
                .then(function (response) { return response.json(); })["catch"](function (error) { return _this.handleError(error); });
        }
        return new Promise(function (resolve) {
            resolve(_this.pokemons);
        });
    };
    PokemonService.getPokemon = function (id) {
        var _this = this;
        if (this.isDev) {
            return fetch("http://localhost:3001/pokemons/" + id)
                .then(function (response) { return response.json(); })
                .then(function (data) { return _this.isEmpty(data) ? null : data; })["catch"](function (error) { return _this.handleError(error); });
        }
        return new Promise(function (resolve) {
            resolve(_this.pokemons.find(function (pokemon) { return id === pokemon.id; }));
        });
    };
    PokemonService.updatePokemon = function (pokemon) {
        var _this = this;
        if (this.isDev) {
            return fetch("http://localhost:3001/pokemons/" + pokemon.id, {
                method: 'PUT',
                body: JSON.stringify(pokemon),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(function (response) { return response.json(); })["catch"](function (error) { return _this.handleError(error); });
        }
        return new Promise(function (resolve) {
            var id = pokemon.id;
            var index = _this.pokemons.findIndex(function (pokemon) { return pokemon.id === id; });
            _this.pokemons[index] = pokemon;
            resolve(pokemon);
        });
    };
    PokemonService.deletePokemon = function (pokemon) {
        var _this = this;
        if (this.isDev) {
            return fetch("http://localhost:3001/pokemons/" + pokemon.id, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(function (response) { return response.json(); })["catch"](function (error) { return _this.handleError(error); });
        }
        return new Promise(function (resolve) {
            var id = pokemon.id;
            _this.pokemons = _this.pokemons.filter(function (pokemon) { return pokemon.id !== id; });
            resolve({});
        });
    };
    PokemonService.addPokemon = function (pokemon) {
        var _this = this;
        delete pokemon.created;
        if (this.isDev) {
            return fetch("http://localhost:3001/pokemons", {
                method: 'POST',
                body: JSON.stringify(pokemon),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(function (response) { return response.json(); })["catch"](function (error) { return _this.handleError(error); });
        }
        return new Promise(function (resolve) {
            _this.pokemons.push(pokemon);
            resolve(pokemon);
        });
    };
    PokemonService.searchPokemon = function (term) {
        var _this = this;
        if (this.isDev) {
            return fetch("http://localhost:3001/pokemons?q=" + term)
                .then(function (response) { return response.json(); })["catch"](function (error) { return _this.handleError(error); });
        }
        return new Promise(function (resolve) {
            var results = _this.pokemons.filter(function (pokemon) { return pokemon.name.includes(term); });
            resolve(results);
        });
    };
    PokemonService.isEmpty = function (data) {
        return Object.keys(data).length === 0;
    };
    PokemonService.handleError = function (error) {
        console.error(error);
    };
    PokemonService.pokemons = mock_pokemon_1["default"];
    PokemonService.isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
    return PokemonService;
}());
exports["default"] = PokemonService;
