<div>
  <canvas id="realtimeChart5"></canvas>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    var ctx5 = document.getElementById('realtimeChart5').getContext('2d');
    var myChart5 = new Chart(ctx5, {
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

    var updateChart5 = function() {
    $.ajax({
      url: "{{ route('api.chart5') }}",
      type: 'GET',
      dataType: 'json',
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success: function(data) {
        myChart5.data.labels = data.labels;
        myChart5.data.datasets[0].data = data.data;
        myChart5.update();
      },
      error: function(data){
        console.log(data);
      }
    });
  }

updateChart5();
setInterval(function() {
  updateChart5();
}, 1000);

</script>