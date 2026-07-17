What We'll Build
We'll build a REST API for a simple content management system with three user roles:

Role	Permissions
user	Read content
editor	Read + create content
admin	Full access — read, create, delete content, manage users
The API will expose these endpoints:

Method	Endpoint	Access
POST	/api/auth/register	Public
POST	/api/auth/login	Public
GET	/api/content	user, editor, admin
POST	/api/content	editor, admin
DELETE	/api/content/:id	admin only
GET	/api/admin/users	admin only