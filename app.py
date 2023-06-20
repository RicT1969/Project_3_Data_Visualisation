import numpy as np
import sqlalchemy

from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, or_
from sqlalchemy.ext.automap import automap_base

from flask import (
    Flask, 
    jsonify, 
    request, 
    render_template, 
    redirect)

import pickle


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///quake_MMI_data.db")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(autoload_with=engine, reflect=True)

# Save reference to the table
print(Base.classes.keys())

quake = Base.classes.quake_MMI_data

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


# ------------------------------------------------
# API 
# ------------------------------------------------
# Data table

@app.route("/api/v1.0/quake_MMI_data")
def quake_MMI_data():
    session = Session(engine)

    results = session.query(quake.publicID, quake.date, quake.mmi, quake.magnitude, quake.longitude, quake.latitude, quake.time, quake.depth).all()

    session.close()
    # Convert list of tuples into normal list

    earthquake = list(np.ravel(results))
    return jsonify(earthquake)
    

if __name__ == '__main__':
    app.run(debug=True)