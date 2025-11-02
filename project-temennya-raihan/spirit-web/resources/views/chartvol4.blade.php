<div>
    <canvas id="realtimeChart10"></canvas>
</div>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    
    var ctx10 = document.getElementById('realtimeChart10').getContext('2d');
    var myChart10 = new Chart(ctx10, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Ampere (A)',
                data: [],
                backgroundColor: '#10439F',
                borderColor: '#10439F',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    var tanggalAwal3 = sessionStorage.getItem('startDate3');
    var tanggalAkhir3 = sessionStorage.getItem('endDate3');
    if (tanggalAwal3 && tanggalAkhir3) {
        document.getElementById('startDate3').value = tanggalAwal3;
        document.getElementById('endDate3').value = tanggalAkhir3;
    }
    var formattedStartDate = new Date(tanggalAwal3).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    var formattedEndDate = new Date(tanggalAkhir3).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    document.getElementById('currentDate4').innerText = formattedStartDate + ' to ' + formattedEndDate;

    var updateChart10 = function() {
        var tanggalAwal3 = document.getElementById('startDate3').value;
        var tanggalAkhir3 = document.getElementById('endDate3').value;

        // Menyimpan tanggal ke dalam sessionStorage
        sessionStorage.setItem('startDate3', tanggalAwal3);
        sessionStorage.setItem('endDate3', tanggalAkhir3);

        $.ajax({
            url: "{{ route('api.chart10') }}",
            type: 'GET',
            dataType: 'json',
            data: {
                startDate3: tanggalAwal3,
                endDate3: tanggalAkhir3
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function(data) {
                myChart10.data.labels = data.labels;
                myChart10.data.datasets[0].data = data.data;
                myChart10.update();
            },
            error: function(data){
                console.log(data);
            }
        });
    }

    updateChart10();
</script>
