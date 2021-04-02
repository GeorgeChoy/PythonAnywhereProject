from .hello import *

def setRotorStartPoint(inRotor,startLetter):
    currentLetter=''
    while(currentLetter!=startLetter):
        item=inRotor[0]
        currentLetter=item[0]
        if(currentLetter!=startLetter):
            inRotor.pop(0)
            inRotor.append(item)
    return inRotor

def AdvanceARotor(inRotor):
    item=inRotor.pop(0)
    inRotor.append(item)
    return inRotor

def getLeftLetter(inRotor,RightLetter):
    rotorCounter = 0
    for FindTwin in inRotor:
        if (FindTwin[0] == RightLetter):
            break
        else:
            rotorCounter = rotorCounter + 1
    return  rotorCounter

def getRightLetter(inRotor,LeftLetter):
    rotorCounter = 0
    for FindTwin in inRotor:
        if (FindTwin[1] == LeftLetter):
            break
        else:
            rotorCounter = rotorCounter + 1
    return  rotorCounter

def getLeftOrRightLetter(inRotor,inLetter,LeftOrRightLetter):
    rotorCounter = 0
    for FindTwin in inRotor:
        if (LeftOrRightLetter=='Left'):
            searchLetter=FindTwin[0]
        elif (LeftOrRightLetter=='Right'):
            searchLetter = FindTwin[1]
        if (searchLetter == inLetter):
            break
        else:
            rotorCounter = rotorCounter + 1
    return  rotorCounter

def FindReflectorDuplicate(inLetter,inIgnorePosition,inReflector):
    counter=0
    for c in inReflector:
        if counter==inIgnorePosition:
            pass
        else:
            if inReflector[counter]==inLetter:
                return counter
        counter = counter+1

def enigma(request,inputText='x',inRotorConfiguration='ABC'):
    result=PopulateRotor()

    Reflector=['A','B','C','D','E','F','G','D','I','J','K','G','M','K','M',
               'I','E','B','F','T','C','V','V','J','A','T']
    positionInAlphabet={'a':0,'b':1,'c':2,'d':3,'e':4,'f':5,
                        'g':6,'h':7,'i':8,'j':9,'k':10,'l':11,
                        'm':12,'n':13,'o':14,'p':15,'q':16,'r':17,
                        's':18,'t':19,'u':20,'v':21,'w':22,'x':23,'y':24,'z':25}
    rotor1 = result[2]
    rotor2 = result[1]
    rotor3 = result[0]
    rotor1Counter=0
    rotor2Counter=0
    rotor3Counter=0
    RConfig=list(inRotorConfiguration)
    target=RConfig[0]
    rotor1=setRotorStartPoint(rotor1,target)
    target=RConfig[1]
    rotor2=setRotorStartPoint(rotor2,target)
    target=RConfig[2]
    rotor3=setRotorStartPoint(rotor3,target)
    WordToEncrypt=inputText
    WordToEncryptList=list(WordToEncrypt)
    EncryptedArray=[]
    for L in WordToEncryptList:
        letterPosition=positionInAlphabet[L]
        rotor3=AdvanceARotor(rotor3)
        r3=rotor3[letterPosition]
        if L=='x':
            print("rotor 3 after advance")
            print(rotor3[0][0])
        if(rotor3[0][0]=='W'):
            rotor2 = AdvanceARotor(rotor2)
            r2 = rotor2[0]
            if L=='x':
                print("advance rotor 2")
                print(r2)
            if (r2[0] == 'F'):
                rotor1 = AdvanceARotor(rotor1)
                if L=='x':
                    print("advance rotor 3")
                    print(rotor1[0])

        r3Right=r3[1]
        if L=='x':
            print(r3Right)
#        rotor2Counter =getLeftLetter(rotor3, r3Right)
        rotor2Counter = getLeftOrRightLetter(rotor3, r3Right,'Left')
        r2Item=rotor2[rotor2Counter]
        if L=='x':
            print(r2Item)
        r2Right=r2Item[1]
        if L=='x':
            print(r2Right)

#        rotor1Counter = getLeftLetter(rotor2, r2Right)
        rotor1Counter = getLeftOrRightLetter(rotor2, r2Right,'Left')

        r1Item=rotor1[rotor1Counter]
        if L=='x':
            print(r1Item)
        r1Right = r1Item[1]
        if L=='x':
            print(r1Right)

#        ReflectorCounter = getLeftLetter(rotor1, r1Right)
        ReflectorCounter = getLeftOrRightLetter(rotor1, r1Right,'Left')
        if L=='x':
            print("ReflectorCounter")
            print(ReflectorCounter)
        ReflectorLetter=Reflector[ReflectorCounter]
        if L=='x':
            print("ReflectorLetter")
            print(ReflectorLetter)
        reflectorDuplicate=FindReflectorDuplicate(ReflectorLetter, ReflectorCounter, Reflector)
        if L=='x':
            print(reflectorDuplicate)
        r1Left=rotor1[reflectorDuplicate][0]
        if L=='x':
            print(r1Left)
#        rotor1Counter=getRightLetter(rotor1, r1Left)
        rotor1Counter=getLeftOrRightLetter(rotor1, r1Left,'Right')
        if L=='x':
            print(rotor1Counter)
        r2Left=rotor2[rotor1Counter][0]
        if L=='x':
            print(r2Left)
#        rotor2Counter = getRightLetter(rotor2, r2Left)
        rotor2Counter = getLeftOrRightLetter(rotor2, r2Left,'Right')

        r3Left=rotor3[rotor2Counter][0]
        if L=='x':
            print(r3Left)
        rotor3Counter = getRightLetter(rotor3, r3Left)
        for key in positionInAlphabet.keys():
            if positionInAlphabet[key]==rotor3Counter:
                EncryptedArray.append(key)
                break
    outstring='';
    for x in EncryptedArray:
        outstring += x
    html = "<html><body>It is now %s.</body></html>" % outstring

    return outstring
