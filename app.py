# import necessary libraries
# from models import create_classes
import os

import numpy as np
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import text
from sqlalchemy import create_engine, func, or_
from sqlalchemy.ext.automap import automap_base

from flask import Flask, jsonify, request, render_template, redirect

import sqlite3
import pickle


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///quake_mmi_data.db")

# # reflect an existing database into a new model
# Base = automap_base()

# # reflect the tables
# Base.prepare(autoload_with=engine, reflect=True)

# # Save reference to the table
# print(Base.classes.keys())

# quake = Base.classes.quake_mmi_test



#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################
# main html index

@app.route("/")
def main():
    return render_template("index.html")

@app.route("/bar-chart")
def bar_chart():
    return render_template("barcharttab.html")

@app.route("/map-tab")
def map_tab():
    return render_template("maptab.html")

@app.route("/line-chart")
def line_chart():
    return render_template("linechart.html")

# ------------------------------------------------
# API 
# ------------------------------------------------

# Data table

@app.route("/api/data")
def quake_mmi_data():

    # with engine.connect as connection:
    connection = engine.connect()

    results = connection.execute('select * from quake_mmi')

    rows = results.fetchall()
    data = [dict(row) for row in rows]

    connection.close()

    return jsonify(data)

    # results = [list(r) for r in results]

# Set up API report data aggregated as report/dropdown

@app.route('/api/dropdown')
def dropdown():
    connection = engine.connect()
    
    publicID = request.args.get('publicID')
    
    if publicID is None:
        publicID = '2023p452421'
        results = connection.execute(text("SELECT date, locality, mmi, magnitude, depth FROM quake_mmi"))
        data = results.fetchall()
        data_dict = []
        
        for row in data:
            data_dict.append({
                'date': row.date,
                'locality': row.locality,
                'mmi': row.mmi,
                'magnitude': row.magnitude,
                'depth': row.depth
            })
        
        connection.close()
        return jsonify(data_dict)


@app.route("/api/dropdown/notfelt")
def quake_mmi_notfelt():

    # with engine.connect as connection:
    connection = engine.connect()

    results = connection.execute('select * from quake_mmi where mmi <= 1')

    rows = results.fetchall()
    data = [dict(row) for row in rows]

    connection.close()

    return jsonify(data)


@app.route("/api/dropdown/weak")
def quake_mmi_weak():

    # with engine.connect as connection:
    connection = engine.connect()

    results = connection.execute('select * from quake_mmi where mmi >2 and mmi <= 4')

    rows = results.fetchall()
    data = [dict(row) for row in rows]

    connection.close()

    return jsonify(data)


@app.route("/api/dropdown/moderate")
def quake_mmi_moderate():

    # with engine.connect as connection:
    connection = engine.connect()

    results = connection.execute('select * from quake_mmi where mmi =5')

    rows = results.fetchall()
    data = [dict(row) for row in rows]

    connection.close()

    return jsonify(data)

@app.route("/api/dropdown/strong")
def quake_mmi_strong():

    # with engine.connect as connection:
    connection = engine.connect()

    results = connection.execute('select * from quake_mmi where mmi >=6')

    rows = results.fetchall()
    data = [dict(row) for row in rows]

    connection.close()

    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
