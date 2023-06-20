import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, request, render_template


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///quake_MMI_data.db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table
quake = Base.classes.quake_MMI_data

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def main():
    return render_template("index1.html")

# @app.route("/data")
# def data():

#     return render_template("data.html")

# @app.route("/analysis")
# def actors():
#     return render_template("analysis.html")


@app.route("/api/v1.0/intense")
def mmiintense():
    
    session = Session(engine)

    results = session.query(quake.publicID, quake.date, quake.mmi, quake.magnitude).all()

    session.close()

    earthquake = [list(r) for r in results]

    earthquake_history = {
        "History": earthquake
    }

    return jsonify(earthquake_history)
    

  

if __name__ == '__main__':
    app.run(debug=True)