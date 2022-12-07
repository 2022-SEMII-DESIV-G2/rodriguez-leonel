package com.especificaciones;

import static spark.Spark.*;
import org.json.JSONObject;

public class App {
    public static void main(String[] args) {

        Pyramids objPyramids = new Pyramids();

        options("/*", (request, response) -> {

            String accessControlRequestHeaders = request
                    .headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers",
                        accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request
                    .headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods",
                        accessControlRequestMethod);
            }

            return "OK";
        });

        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));

        get("/pyramids", (req, res) -> {
            res.type("application/json");
            JSONObject jsonobj = new JSONObject(objPyramids);
            return jsonobj;
        });

        get("/pyramids/:id", (req, res) -> {
            res.type("application/json");
            JSONObject jsonobj = new JSONObject(objPyramids.getPyramids().get(Integer.parseInt(req.params(":id")) - 1));
            return jsonobj;
        });

        post("/pyramids", (req, res) -> {
            res.type("application/json");
            Pyramid pyramid = new Pyramid();
            JSONObject body = new JSONObject(req.body());
            pyramid.setId(objPyramids.getPyramids().size() + 1);
            pyramid.setDatos(body.getString("datos"));
            pyramid.setMayor(body.getString("mayor"));
            pyramid.setTamano(body.getInt("tamano"));
            pyramid.setIterations(body.getInt("iterations"));
            pyramid.setRouteid(body.getInt("routeid"));
            pyramid.setTotal(body.getInt("total"));
            
            objPyramids.addPyramid(pyramid);
            JSONObject jsonobj = new JSONObject(objPyramids);
            return jsonobj;
        });
    }
}