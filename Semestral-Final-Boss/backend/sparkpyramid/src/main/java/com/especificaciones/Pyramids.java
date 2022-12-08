package com.especificaciones;

import java.util.ArrayList;

public class Pyramids {
    ArrayList<Pyramid> pyramids = new ArrayList<Pyramid>();

    public ArrayList<Pyramid> getPyramids() {
        return pyramids;
    }

    public void addPyramid(Pyramid pyramid) {
        pyramids.add(pyramid);
    }
}
