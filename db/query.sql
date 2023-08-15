SELECT E.first_name AS "Employee Name", 
    CONCAT(M.first_name," ", M.last_name) AS "Manager" 
    FROM employee E 
    LEFT OUTER JOIN employee M 
    ON E.manager_id = M.id;