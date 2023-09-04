# [Deleting the profile table from Supabase](https://app.tango.us/app/workflow/d61a055b-f7bb-4b53-a53c-01b866ec62ee?utm_source=markdown&utm_medium=markdown&utm_campaign=workflow%20export%20links)

This shows step-by-step how to delete the profiles table, users, and triggers to recreate with modifications.

__Creation Date:__ August 20, 2023  
__Created By:__ Thenlie  
[View most recent version on Tango.us](https://app.tango.us/app/workflow/d61a055b-f7bb-4b53-a53c-01b866ec62ee?utm_source=markdown&utm_medium=markdown&utm_campaign=workflow%20export%20links)



***




## # [Supabase | The Open Source Firebase Alternative](https://supabase.com/)


### 1. Click on Dashboard
![Step 1 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/75ab2105-001d-40e3-a3ee-182210f40317/5edb5fa1-f9f0-4770-afb7-d02e6eb0ff5e.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=933&mark-y=8&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz01MCZoPTE5JmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)


### 2. Click on All projects
![Step 2 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/75fdd9be-6816-413c-a12e-32104d2a7c79/51459f6c-f935-4433-a69d-c89284124885.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=11&mark-y=54&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMjAmaD0yMCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 3. Click on develop…
![Step 3 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/a760db49-62a1-45a4-866d-768d527c706e/374969ec-9dd2-4226-a03d-f991e9eb8f05.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=500&mark-y=204&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zNDQmaD03NiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 4. Click on Authentication tab
![Step 4 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/955428f5-da17-43d0-9885-ad6c5cc1da8a/496339c3-96f4-4b8e-9439-4340df9417b1.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=2&mark-y=146&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yNiZoPTI3JmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)


### 5. To remove users from the auth table, click on dropdown trigger
![Step 5 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/8c37de34-0124-4d8f-aa30-92c3efda5619/75124b47-9e3e-4f36-86f9-41cb41b9587e.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=1103&mark-y=104&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yNSZoPTE4JmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)


### 6. Click on Delete user
![Step 6 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/be3ea8dc-cece-4150-a79f-ba4556bb3bf7/e11e29a7-fb1e-4822-989d-c7481473831d.png?crop=focalpoint&fit=crop&fp-x=0.8456&fp-y=0.2970&fp-z=3.0288&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=723&mark-y=272&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTYlMkNGRjc0NDImdz0yMjcmaD02OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 7. Click on Confirm
![Step 7 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/ff286855-c1e5-4960-ac69-6d1b414555dc/3a13bb0c-d48d-449e-b691-72f3ac36de28.png?crop=focalpoint&fit=crop&fp-x=0.5642&fp-y=0.5459&fp-z=2.9900&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=538&mark-y=343&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTYlMkNGRjc0NDImdz0xMjQmaD01NyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 8. Repeat these steps for any additional users
![Step 8 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/a823ad6c-4a5a-4e8c-a1c1-dbee0fbec328/e7ee816d-934d-428c-a00a-6c6f8326fede.png?crop=focalpoint&fit=crop&fp-x=0.9250&fp-y=0.1519&fp-z=3.0858&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=885&mark-y=321&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTYlMkNGRjc0NDImdz03NiZoPTU1JmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)


### 9. Click on Database tab
![Step 9 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/020d286d-734b-45d7-90a5-880a69ced276/2f12413a-8285-468e-982e-3a873f6300de.png?crop=focalpoint&fit=crop&fp-x=0.0128&fp-y=0.1789&fp-z=2.9754&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=7&mark-y=332&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTYlMkNGRjc0NDImdz03OCZoPTgwJmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)


### 10. Click on Triggers
![Step 10 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/48edc284-c617-4a7b-9407-ba01d5e70580/ec2a6a2d-2cb7-4027-a095-66777a9ec9ea.png?crop=focalpoint&fit=crop&fp-x=0.0854&fp-y=0.1278&fp-z=2.4315&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=87&mark-y=206&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTYlMkNGRjc0NDImdz0zMjUmaD00OSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 11. Click on dropdown trigger for 'on_auth_user_created'
![Step 11 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/684a977a-6cf2-4a4a-9382-cf4612b38953/5fdce002-478f-433f-9477-9399255a1033.png?crop=focalpoint&fit=crop&fp-x=0.5472&fp-y=0.4891&fp-z=1.0850&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=1146&mark-y=286&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTYlMkNGRjc0NDImdz0yNyZoPTE5JmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)


### 12. Click on Delete trigger
![Step 12 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/505acc0e-a784-450f-af32-503052eca491/5f3dfce1-369a-4650-bd2e-886a2b750c8f.png?crop=focalpoint&fit=crop&fp-x=0.9176&fp-y=0.4504&fp-z=3.0296&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=679&mark-y=338&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTYlMkNGRjc0NDImdz00NDMmaD02OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 13. Type "on_auth_user_created"
![Step 13 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/e178ba29-fe67-4fc2-aaf4-665a8a21666b/197f62c8-f702-48c1-abf6-1360ecc918c5.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5624&fp-z=2.1601&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=389&mark-y=344&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTYlMkNGRjc0NDImdz00MjImaD01NiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 14. Click on Delete trigger on_auth_user_created
![Step 14 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/96462152-60f8-438c-be1a-dfdeefb9f6a7/663b9bd7-b1e5-438b-9f89-0350a2fe7f16.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.6188&fp-z=2.1601&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=389&mark-y=344&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTYlMkNGRjc0NDImdz00MjImaD01NiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 15. Click on Table Editor tab
![Step 15 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/8dfbbba2-f3f2-4cca-9dfe-ed3a901c77b2/bd479f58-bda6-4ecd-8f87-94b37d76c25a.png?crop=focalpoint&fit=crop&fp-x=0.0128&fp-y=0.1000&fp-z=2.9754&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=7&mark-y=181&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTYlMkNGRjc0NDImdz03OCZoPTgwJmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)


### 16. Click on profiles
![Step 16 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/a8161113-6b42-421b-b71d-3dbcc38620c5/ebeeb450-97d8-4856-881a-beebdbc0bd9a.png?crop=focalpoint&fit=crop&fp-x=0.0803&fp-y=0.1835&fp-z=2.5170&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=96&mark-y=318&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTYlMkNGRjc0NDImdz0yOTQmaD01MSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 17. Click on dropdown trigger
![Step 17 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/52dcfbe9-3040-4103-bc99-81b9cbc1e213/f8894993-f063-4853-8209-748677ea7b28.png?crop=focalpoint&fit=crop&fp-x=0.1285&fp-y=0.1835&fp-z=3.1591&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=468&mark-y=352&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTYlMkNGRjc0NDImdz0zOSZoPTM5JmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)


### 18. Click on Delete Table
![Step 18 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/d21a172c-88aa-4b30-bdd7-89618f7ae2e2/73b05191-2597-4e3c-9779-fbdecc4abced.png?crop=focalpoint&fit=crop&fp-x=0.1699&fp-y=0.2955&fp-z=2.5499&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=379&mark-y=343&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTYlMkNGRjc0NDImdz0yODImaD01NyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 19. Check 'Drop table with cascade?'
![Step 19 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/e64238e3-bf9a-4a92-bf8e-fddcca5277b2/28aa3a18-419d-465d-900a-c04114875c38.png?crop=focalpoint&fit=crop&fp-x=0.4241&fp-y=0.4496&fp-z=3.1442&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=579&mark-y=350&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTYlMkNGRjc0NDImdz00MiZoPTQyJmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)


### 20. Click on Delete
![Step 20 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/612b73e6-1fad-428e-846b-c0464d0f4cd2/59d423ed-b5a6-4c73-8b89-77a713a98d4f.png?crop=focalpoint&fit=crop&fp-x=0.5663&fp-y=0.6301&fp-z=3.0279&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=545&mark-y=343&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTYlMkNGRjc0NDImdz0xMTAmaD01OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 21. Click on SQL Editor tab
![Step 21 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/5d39d480-feb8-4578-94da-a0dee091e75a/a43b1fc3-9c41-4730-85c3-cf292c5d1f8f.png?crop=focalpoint&fit=crop&fp-x=0.0128&fp-y=0.1361&fp-z=2.9754&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=7&mark-y=261&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTYlMkNGRjc0NDImdz03OCZoPTgwJmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)


### 22. Click on Create a table for public profiles
![Step 22 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/f4097680-e324-42c1-881f-19b1904cdac0/61813ed9-b34d-4312-9be8-df68b89ddbd4.png?crop=focalpoint&fit=crop&fp-x=0.0784&fp-y=0.1910&fp-z=2.5170&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=90&mark-y=318&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTYlMkNGRjc0NDImdz0yOTQmaD03OSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 23. Click on RUN
![Step 23 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/f6dfe686-b754-4564-8580-7f49b774611b/688e2046-9f97-4ae1-a3d7-8e17e49ba9cc.png?crop=focalpoint&fit=crop&fp-x=0.5396&fp-y=0.5066&fp-z=1.0708&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=1131&mark-y=401&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTYlMkNGRjc0NDImdz01MiZoPTIwJmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)


### 24. Click on Execute query
![Step 24 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/8d0b090e-040f-46e2-936c-b102031a81d2/bf2a5b4f-434e-438e-a2c1-c4ad109c1385.png?crop=focalpoint&fit=crop&fp-x=0.5407&fp-y=0.5534&fp-z=2.6214&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=472&mark-y=347&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTYlMkNGRjc0NDImdz0yNTYmaD01MCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 25. Ensure output reads: "Success. No rows returned"
![Step 25 screenshot](https://images.tango.us/workflows/d61a055b-f7bb-4b53-a53c-01b866ec62ee/steps/c42c7a38-0a69-4333-9f81-dc6f381979bc/d11da024-9029-4c9d-9a94-9cec161a8951.png?crop=focalpoint&fit=crop&fp-x=0.2503&fp-y=0.5638&fp-z=2.0000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=343&mark-y=379&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTYlMkNGRjc0NDImdz0yMDUxJmg9NjcmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D)

<br/>

***
Created with [Tango.us](https://tango.us?utm_source=markdown&utm_medium=markdown&utm_campaign=workflow%20export%20links)
