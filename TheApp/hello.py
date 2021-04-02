import re
import glob
import os

def PopulateRotor():

    RN=1
    mainArray=[]
    rotorArray1 = []
    rotorArray2 = []
    rotorArray3 = []

    module_dir = os.path.abspath(os.path.dirname(__file__))
    os.chdir(module_dir)
    with open("rotordata.txt") as fp:
        line='a'
        while line:
            if (re.search("2", line) or re.search("3", line) or re.search("a", line)):
                if (re.search("2", line)):
                    RN = 2
                elif (re.search("3", line)):
                    RN = 3
                pass
            else:
                d= line.strip()
                data = d.split(",")
                if (RN==1):
                    rotorArray1.append(data)
                elif (RN==2):
                    rotorArray2.append(data)
                elif (RN==3):
                    rotorArray3.append(data)
            line = fp.readline()
        mainArray.append(rotorArray1)
        mainArray.append(rotorArray2)
        mainArray.append(rotorArray3)
    return (mainArray)
