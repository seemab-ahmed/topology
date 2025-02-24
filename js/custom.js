// Function to handle dropdown selection change
function handleDropdownChange() { 
  const selectedValue = document.getElementById("topologyDropdown").value;
  // Hide all topology sections 
  const sections = document.querySelectorAll(".topology-row");
  sections.forEach(section => {
      section.style.display = "none";
  });
  // Show the selected section based on the dropdown value
  const selectedSection = document.getElementById(selectedValue.replace(/\s+/g, '-').toLowerCase());
  if (selectedSection) {
      selectedSection.style.display = "flex";
  }
}
// Global data to populate the form
const topo1Data = {
    "vpcName": "OraStage-VCN",
    "vpcCIDR": "10.0.0.0/16",
    "publicSubnetName": "PUB-SUBNET",
    "publicSubnetCIDR": "10.0.1.0/24",
    "publicSLName": "PUB-SL",
    "publicRTName": "PUB-RT",
    "privateSubnetRange": "WEB-SUBNET",
    "privateSubnetCIDR": "10.0.2.0/24",
    "privateSLName": "WEB-SL",
    "privateRTName": "WEB-RT",
    "SubnetName": "APP-SUBNET",
    "SubnetRange": "10.0.3.0/24",
    "SLName": "APP-SL",
    "RTName": "APP-RT"
};
function populateForm(topoNumber) {
    console.log("populateForm clicked"); // This should ONLY show when clicked

    if (!topoNumber) {
        alert("Topology number is missing.");
        return;
    }

    if (typeof topo1Data === "undefined") {
        console.error("topo1Data is not defined.");
        return;
    }

    const setFieldValue = (fieldId, value) => {
        const inputElement = document.getElementById(`${fieldId}${topoNumber}`);
        if (inputElement) {
            inputElement.value = value || "";
        }
    };

    const mappings = [
        { field: "vpcName", dataKey: "vpcName" },
        { field: "vpcCIDR", dataKey: "vpcCIDR" },
        { field: "publicSubnetName", dataKey: "publicSubnetName" },
        { field: "publicSubnetCIDR", dataKey: "publicSubnetCIDR" },
        { field: "publicSLName", dataKey: "publicSLName" },
        { field: "publicRTName", dataKey: "publicRTName" },
        { field: "privateSubnetRange", dataKey: "privateSubnetRange" },
        { field: "privateSubnetCIDR", dataKey: "privateSubnetCIDR" },
        { field: "privateSLName", dataKey: "privateSLName" },
        { field: "privateRTName", dataKey: "privateRTName" },
        { field: "SubnetName", dataKey: "SubnetName" },
        { field: "SubnetRange", dataKey: "SubnetRange" },
        { field: "SLName", dataKey: "SLName" },
        { field: "RTName", dataKey: "RTName" }
    ];

    mappings.forEach(({ field, dataKey }) => {
        if (topo1Data[dataKey]) {
            setFieldValue(field, topo1Data[dataKey]);
        }
    });
}
// Function to generate output based on entered values
function generateOutput(event, topoNumber) {
    if (event) event.preventDefault();
    if (!topoNumber) {
        alert("Topology number is required.");
        return;
    }

    const updateElement = (fieldId, diagramId) => {
        const fieldValue = document.getElementById(`${fieldId}${topoNumber}`)?.value;
        const diagramElement = document.getElementById(`${diagramId}-${topoNumber}`);
        if (diagramElement) {
            diagramElement.innerHTML = fieldValue || "";
        }
    };

    const mappings = [
        { field: "vpcName", diagram: "vpc-name" },
        { field: "vpcCIDR", diagram: "vcn-cidr" },
        { field: "publicSubnetName", diagram: "public-name" },
        { field: "publicSubnetCIDR", diagram: "public-cidr" },
        { field: "publicSLName", diagram: "public-sl-name" },
        { field: "publicRTName", diagram: "public-rt-name" },
        { field: "privateSubnetRange", diagram: "private-name" },
        { field: "privateSubnetCIDR", diagram: "private-cidr" },
        { field: "privateSLName", diagram: "private-sl-name" },
        { field: "privateRTName", diagram: "private-rt-name" },
        { field: "SubnetName", diagram: "subnet-label" },
        { field: "SubnetRange", diagram: "subnet-no" },
        { field: "SLName", diagram: "sl-label" },
        { field: "RTName", diagram: "priv-rt-name" }
    ];

    mappings.forEach(({ field, diagram }) => updateElement(field, diagram));
}

// Function to populate data in the popup
function codeFieldData() {
    const codeVpcName = document.getElementById("vpcName").value;
    const CodeVpcCIDR = document.getElementById("vpcCIDR").value;
    const codeVpcPublicSLName = document.getElementById("publicSLName").value;
    const CodeVpcPublicRTName = document.getElementById("publicRTName").value;

    document.getElementById("code-vcn-name").innerHTML = codeVpcName;
    document.getElementById("code-vcn-cidr").innerHTML = CodeVpcCIDR;
    document.getElementById("code-vcn-sl-name").innerHTML = codeVpcPublicSLName;
    document.getElementById("code-vcn-rt-name").innerHTML = CodeVpcPublicRTName;
}
// Function to download data as a file
function downloadFiles() {
    const vcnName = document.getElementById("code-vcn-name").innerHTML;
    const vcnCIDR = document.getElementById("code-vcn-cidr").innerHTML;
    const vcnSLName = document.getElementById("code-vcn-sl-name").innerHTML;
    const vcnRTName = document.getElementById("code-vcn-rt-name").innerHTML;
    // Prepare the content for the file
    const content = `
Create VCN Name: ${vcnName}
Create VCN CIDR: ${vcnCIDR}
Create Security List Name: ${vcnSLName}
Create Routing Table Name: ${vcnRTName}
    `.trim();
    // Create and trigger file download
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "terraform_code.txt";
    a.click();
    URL.revokeObjectURL(url);
}
// Function to show popup
function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'block';
        codeFieldData();
    }
}
// Function to close popups
function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'none';
    }
}
 // Open all popups dynamically by class
function openAllPopups(popupClass) {
  const popups = document.querySelectorAll(popupClass);
  popups.forEach(popup => popup.style.display = "block");
}
// Close all popups dynamically by class
function closeAllPopups(popupClass) {
  const popups = document.querySelectorAll(popupClass);
  popups.forEach(popup => popup.style.display = "none");
}
// Flow lines
let lines = {}; 
const connectionMap = {
    'chk-pub-priv-db': [['top1-pub-1', 'top1-db-1'], ['top1-priv-1', 'top1-db-1'], ['top1-priv-2', 'top1-db-1']],
    'chk-pub-inet': [['top1-pub-1', 'top1-inet-1']],
    // 'chk-priv-inet': [['top1-priv-1', 'top1-inet-1'], ['top1-priv-2', 'top1-inet-1']],
    'chk-priv-inet': [
    // The third parameter is the options object for LeaderLine
    ['top1-priv-1', 'top1-inet-1',{
        path: 'magnet',
        startSocket: 'top',
        endSocket: 'bottom',
        startPlug: 'arrow1',
        endPlug: 'arrow'
      }],
    ['top1-priv-2', 'top1-inet-1',{
        path: 'magnet',
        startSocket: 'top',
        endSocket: 'bottom',
        startPlug: 'arrow1',
        endPlug: 'arrow'
      }]
  ],
    'chk-pub-priv-bidirectional': 
    [
        ['top1-pub-1', 'top1-priv-1', { path: 'straight', startPlug: 'arrow1', endPlug: 'arrow' }],
        ['top1-pub-1', 'top1-priv-2', { path: 'arc', startPlug: 'arrow1', endPlug: 'arrow' }]
    ]
};
const endpointIds = ['top1-pub-1', 'top1-priv-1', 'top1-priv-2', 'top1-db-1', 'top1-inet-1'];

const createLeaderLine = (start, end, options = {}) => 
    new LeaderLine(document.getElementById(start), document.getElementById(end), { 
        color: options.color || '#2474ad', size: 3, path: options.path || 'fluid',
        startPlug: options.startPlug || 'behind', endPlug: options.endPlug || 'arrow', hide: true
    }).show('draw', { duration: 800 });

const updateFlowLines = () => {
    document.querySelectorAll('.flow-checkbox').forEach(checkbox => {
        if (checkbox.checked) {
            if (!lines[checkbox.id]) lines[checkbox.id] = connectionMap[checkbox.id]?.map(([s, e, o = {}]) => createLeaderLine(s, e, o));
        } else {
            lines[checkbox.id]?.forEach(line => line.hide('fade', { duration: 500 }));
            delete lines[checkbox.id];
        }
    });
};

const handleShowEndpoints = () => {
    let show = document.getElementById('chk-show-endpoints').checked;
    endpointIds.forEach(id => document.getElementById(id).style.display = show ? 'block' : 'none');
    document.querySelectorAll('.flow-checkbox').forEach(checkbox => {
        checkbox.closest('label').style.display = show ? 'block' : 'none';
        if (!show) checkbox.checked = false;
    });
    updateFlowLines();
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('chk-show-endpoints').addEventListener('change', handleShowEndpoints);
    document.querySelectorAll('.flow-checkbox').forEach(checkbox => checkbox.addEventListener('change', updateFlowLines));
    handleShowEndpoints();
});
// 'chk-priv-inet': [
//     ['top1-priv-1', 'top1-inet-1', { path: 'arc', startPlug: 'arrow1', endPlug: 'arrow', middleLabel: 'Via NAT' }],
//     ['top1-priv-2', 'top1-inet-1', { path: 'arc', startPlug: 'arrow1', endPlug: 'arrow', middleLabel: 'Via NAT' }]
// ]