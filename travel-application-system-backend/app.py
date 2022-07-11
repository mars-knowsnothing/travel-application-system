import asyncio
from email import message
from email.mime import application
import json
import tornado.web
import sqlite3

conn = sqlite3.connect('./kiaa-travel-application-db')
c = conn.cursor()

# try:
#     c.execute('''CREATE TABLE users (nom text, prenom text, age int)''')
# except sqlite3.OperationalError:
#     pass

class Table(object):
    def __init__(self, **kwargs) -> None:
        self.cursor = c
        self.connection = conn
        self.kwargs = kwargs
        pass
    

class User(Table):
    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)
        pass

    def retrieve(self):
        conditions = " AND ".join([str(k)+ " = '" +str(v)+"'" for k,v in self.kwargs.items() if v!=None])
        if conditions:
            query_string = 'select * from users where {conditions};'.format(conditions=conditions)
        else:
            query_string = 'select * from users;'
        print(query_string)
        self.cursor.execute(query_string)
        res = self.cursor.fetchall()
        #search about fetchmany(int), fetchone() to get only some records or one (note that after getting it, the cursor will increment)
        users = []
        for i in res:
            print(i)
            users.append(i)
        # self.write({"applications":applications})
        return users



class Application(Table):
    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)
        pass

    def create(self):
        name = self.kwargs.get('name')
        pkuId = self.kwargs.get('pkuId')
        approvedBy = self.kwargs.get('approvedBy')
        approvalStatus = self.kwargs.get('approvalStatus')
        reason = self.kwargs.get('reason')
        mobile = self.kwargs.get('mobile')
        destinationIsLowRiskArea = self.kwargs.get('destinationIsLowRiskArea')
        dateOfLeavingBeijing = self.kwargs.get('dateOfLeavingBeijing')
        transportationLeaving = self.kwargs.get('transportationLeaving')
        transportationDetailsLeaving = self.kwargs.get('transportationDetailsLeaving')
        stopoverPlacesLeaving = self.kwargs.get('stopoverPlacesLeaving')
        destination = self.kwargs.get('destination')
        dateOfReturningToBeijing = self.kwargs.get('dateOfReturningToBeijing')
        transportationReturning = self.kwargs.get('transportationReturning')
        transportationDetailsReturning = self.kwargs.get('transportationDetailsReturning')
        stopoverPlacesReturning = self.kwargs.get('stopoverPlacesReturning')
        dateOfReturningToPKU = self.kwargs.get('dateOfReturningToPKU')
        submissionDate = self.kwargs.get('submissionDate')
        applicationId = self.kwargs.get('applicationId')
        self.cursor.execute("insert into applications values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", (
            name, pkuId, approvedBy, approvalStatus, reason, mobile, destinationIsLowRiskArea, 
            dateOfLeavingBeijing, transportationLeaving, transportationDetailsLeaving,
            stopoverPlacesLeaving, destination, dateOfReturningToBeijing, 
            transportationReturning, transportationDetailsReturning, 
            stopoverPlacesReturning, dateOfReturningToPKU, submissionDate, applicationId
        ))
        conn.commit()

        return "created"
    
    def retrieve(self):
        conditions = " AND ".join([str(k)+ " = '" +str(v)+"'" for k,v in self.kwargs.items() if v!=None])
        if conditions:
            query_string = 'select * from applications where {conditions};'.format(conditions=conditions)
        else:
            query_string = 'select * from applications;'
        print(query_string)
        self.cursor.execute(query_string)
        res = self.cursor.fetchall()
        #search about fetchmany(int), fetchone() to get only some records or one (note that after getting it, the cursor will increment)
        applications = []
        for i in res:
            print(i)
            applications.append(i)
        # self.write({"applications":applications})
        return applications
    
    def update(self,applicationId):
        # UPDATE COMPANY SET ADDRESS = 'Texas' WHERE ID = 6;
        where_condition = "where applicationId = {applicationId}".format(applicationId=applicationId)
        columns = ", ".join([" = ".join([k,"'"+v+"'"]) for k,v in self.kwargs.items()])
        query_string_update = "update applications set {columns} {where_condition}".format(columns=columns,where_condition=where_condition)
        print(query_string_update)
        self.cursor.execute(query_string_update)
        conn.commit()
        query_string = "select * from applications where applicationId = {applicationId}".format(applicationId=applicationId)
        self.cursor.execute(query_string)
        print(query_string)
        res = self.cursor.fetchone()
        print(res)
        return res
    
    def delete(self,applicationId):
        # DELETE FROM MySQL_table WHERE id=10;
        query_string_delete = "delete from applications where applicationId = {applicationId}".format(applicationId=applicationId)
        print(query_string_delete)
        self.cursor.execute(query_string_delete)
        conn.commit()
        return {"message":"application {applicationId} has been deleted!".format(applicationId=applicationId)}

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write({"applications":[{"name":"Hello, world"}]})

class LoginHandler(tornado.web.RequestHandler):
    schema = [
        "name", "pkuId", "approvedBy", "approvalStatus", "reason", "mobile", "destinationIsLowRiskArea",
        "dateOfLeavingBeijing", "transportationLeaving", "transportationDetailsLeaving",
        "stopoverPlacesLeaving", "destination", "dateOfReturningToBeijing", "transportationReturning",
        "transportationDetailsReturning", "stopoverPlacesReturning", "dateOfReturningToPKU","submissionDate"
    ]

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "*")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    def options(self, *args):
        self.set_status(204)
        self.finish()

    def post(self):
        
        payload = json.loads(self.request.body)
        pkuId = payload["pkuId"]
        password = payload["password"]
        user = User(pkuId=pkuId)
        users = user.retrieve()
        if len(users)<1:
            resp = dict(
                result=False,
                message="PKU ID {pkuId} not found!".format(pkuId=pkuId)
            )
        else:
            if users[0][3]==password:
                resp = dict(
                    result = True,
                    message="PKU ID {pkuId} logged in!".format(pkuId=pkuId),
                    userInfo = {
                        "name":users[0][0],
                        "pkuId":users[0][1],
                        "role":users[0][2],
                        "departmentCode":users[0][4],
                        "departmentName":users[0][5]
                    }
                )
            else:
                resp = dict(
                    result = False,
                    message="PKU ID {pkuId} password incorrect!".format(pkuId=pkuId)
                )
        self.write(resp)
class LogoutHandler(tornado.web.RequestHandler):
    schema = []

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "*")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')

    def options(self, *args):
        self.set_status(204)
        self.finish()

    def post(self):
        payload = json.loads(self.request.body)
        resp = dict(
            result = True,
            message="PKU ID {pkuId} logged out!".format(pkuId=payload["pkuId"]),
            userInfo = payload
        )
        self.write(resp)

class ApplicationHandler(tornado.web.RequestHandler):
    schema = [
        "name", "pkuId", "approvedBy", "approvalStatus", "reason", "mobile", "destinationIsLowRiskArea",
        "dateOfLeavingBeijing", "transportationLeaving", "transportationDetailsLeaving",
        "stopoverPlacesLeaving", "destination", "dateOfReturningToBeijing", "transportationReturning",
        "transportationDetailsReturning", "stopoverPlacesReturning", "dateOfReturningToPKU","submissionDate",
        "applicationId"
    ]
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "*")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')

    def get(self):
        list_applications_params = dict()
        for param in self.schema:
            list_applications_params[param]=self.get_query_argument(param,None)
        application = Application(**list_applications_params)
        result = application.retrieve()
        self.write({"applications":[{k: record[self.schema.index(k)] for k in self.schema} for record in result]})

    def delete(self, applicationId):
        application = Application(applicationId=applicationId)
        result = application.delete(applicationId=applicationId)
        self.write(result)

    def put(self,applicationId):
        payload = json.loads(self.request.body)
        update_application_params = dict()
        for param in self.schema:
            if payload.get(param):
                update_application_params[param]=payload[param]
        print(update_application_params)
        application = Application(**update_application_params)
        result = application.update(applicationId=applicationId)
        self.write({"application":{k:result[self.schema.index(k)] for k in self.schema}})

    def post(self):
        payload = json.loads(self.request.body)
        create_application_params = dict()
        for param in self.schema:
            create_application_params[param]=payload[param]
        print(create_application_params)
        application = Application(**create_application_params)
        result = application.create()
        self.write(result)

    def options(self, *args):
        self.set_status(204)
        self.finish()

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/login", LoginHandler),
        (r"/logout", LogoutHandler),
        (r"/applications", ApplicationHandler),
        (r"/applications/([^/]+)", ApplicationHandler),
    ])

async def main():
    app = make_app()
    app.listen(8888)
    await asyncio.Event().wait()

if __name__ == "__main__":
    asyncio.run(main())