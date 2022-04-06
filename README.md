# Build a Restful API | Nodejs + Express + Mongodb

## Author: VanHungNguyen

#How to use

1. User {deviceId, name, note, tag, balance}

    > POST /user/add
    > PUT /user/update/:id
    > PUT /user/change_balance/:id
    > DELETE /user/delete/:id
    > GET /user/info(?page=1&limit=10&idStart=1&idEnd=10)
    > GET /user/detail/:deviceId

2. User Role { userId, roleId, roleName, note, tag }

    > POST /user_role/add
    > PUT /user_role/update/:id
    > DELETE /user_role/delete/:id
    > GET /user_role/info(?page=1&limit=10&idStart=1&idEnd=10)

3. Software {softwareName, softwareDescription, softwareImage, note, tag }

    > POST /software/add
    > PUT /software/update/:id
    > DELETE /software/delete/:id
    > GET /software/info(?page=1&limit=10&idStart=1&idEnd=10)

4. Software Offer { softwareId, offerName, price, offerDay, note, tag }

    > POST /software_offer/add
    > PUT /software_offer/update/:id
    > DELETE /software_offer/delete/:id
    > GET /software_offer/info(?page=1&limit=10&idStart=1&idEnd=10)

5. Subscription { userId, softwareId, subcribedAt, expiredDate, note, tag }

    > POST /subscription/add
    > PUT /subscription/update/:id_subscription
    > DELETE /subscription/delete/:id_subscription
    > GET /subscription/info(?page=1&limit=10&idStart=1&idEnd=10)

6. User Activity { userId, activityName, description, note, tag }

    > POST /user_activity/add
    > PUT /user_activity/update/:userId
    > DELETE /user_activity/delete/:userId
    > GET /user_activity/info(?page=1&limit=10&idStart=1&idEnd=10)

7. User Resource { userId, resourceType, resourceUrl, note, tag }

    > POST /user_resource/add
    > PUT /user_resource/update/:userId
    > DELETE /user_resource/delete/:userId
    > GET /user_resource/info(?page=1&limit=10&idStart=1&idEnd=10)

8. Data {
   userId,
   propertyNames,
   category,
   websiteUrl,
   property1,
   property2,
   property3,
   property4,
   property5,
   property6,
   property7,
   property8,
   property9,
   property10,
   property11,
   property12,
   property13,
   property14,
   property15,
   property16,
   property17,
   property18,
   property19,
   property20,
   note,
   tag,
   }

    > POST /data/add
    > PUT /data/update/:id
    > DELETE /data/delete/:id
    > GET /data/info(?page=1&limit=10&idStart=1&idEnd=10&category=hehe&userId=abc&websiteUrl=https://www.facebook.com&timeStart=2022-03-29&timeEnd=2022-03-30)
