
const { Client } = require('pg');
const sql = require('mssql');

// Configuration for MS SQL Server and PostgreSQL
const mssqlConfig = {
    user: 'mssql_user',
    password: 'mssql_password',
    server: 'localhost',
    database: 'mssql_db',
    options: {
        encrypt: true,
        enableArithAbort: true
    }
};

const postgresConfig = {
    user: 'postgres_user',
    host: 'localhost',
    database: 'postgres_db',
    password: 'postgres_password',
    port: 5432
};

// Connect to both databases
async function transferData() {
    try {
        // Connect to MS SQL Server
        const mssqlPool = await sql.connect(mssqlConfig);
        console.log("Connected to MS SQL Server");

        // Connect to PostgreSQL
        const pgClient = new Client(postgresConfig);
        await pgClient.connect();
        console.log("Connected to PostgreSQL");

        // Get list of all tables from MS SQL Server
        const result = await mssqlPool.request().query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'");
        const tables = result.recordset.map(row => row.TABLE_NAME);

        for (const table of tables) {
            console.log(`Transferring data from table: ${table}`);
            
            let offset = 0;
            let fetchSize = 100;
            let hasMoreRecords = true;

            while (hasMoreRecords) {
                const query = `SELECT * FROM ${table} ORDER BY (SELECT NULL) OFFSET ${offset} ROWS FETCH NEXT ${fetchSize} ROWS ONLY`;
                const data = await mssqlPool.request().query(query);

                if (data.recordset.length > 0) {
                    const records = data.recordset;

                    // Insert records into PostgreSQL
                    for (const record of records) {
                        const columns = Object.keys(record).map(col => `"${col}"`).join(",");
                        const values = Object.values(record).map(val => `'${val}'`).join(",");
                        const insertQuery = `INSERT INTO ${table} (${columns}) VALUES (${values})`;

                        await pgClient.query(insertQuery);
                    }

                    console.log(`Transferred ${records.length} records from table: ${table}`);
                    offset += fetchSize;
                } else {
                    hasMoreRecords = false;
                    console.log(`Completed transfer for table: ${table}`);
                }
            }
        }

        // Close connections
        await pgClient.end();
        await sql.close();
    } catch (err) {
        console.error("Error during data transfer:", err);
    }
}

transferData();
