# Setting up the Project

 1. **Create Databases**: Create a MySQL database and a MongoDB database. For MySQL, run the following command in your MySQL database:`CREATE  TABLE IF NOT  EXISTS `tasks` ( id BIGINT  NOT  NULL  PRIMARY KEY AUTO_INCREMENT, task VARCHAR(255) NOT  NULL, conclusion BOOLEAN  DEFAULT  false );`
 2. **Clone Repository**: Clone the branch into a folder on your machine.
 3. **Environment Setup**: Rename `.env-example` to `.env` and add the environment variables required for the project.
 4. **Check Ports**: Ensure that ports 3000 and 4200 are not being used. You can use the following commands to check and kill processes using these ports:`sudo kill -9 'sudo lsof -t -i:3000' sudo kill -9 'sudo lsof -t -i:4200'`

# Running the Application

 1. **Install Dependencies**: Navigate to the API and frontend folders and install the dependencies: <br>`cd ./techXApi`
``npm install`` <br />
``cd ../techx``
``npm install``
 2. **Run the API**: Start the API locally by running the following command in the `api` folder: <br>`npm run start:dev`
 3. **Run the Frontend**: Start the frontend by running the following command in the `frontend` folder:  <br>`ng serve`
